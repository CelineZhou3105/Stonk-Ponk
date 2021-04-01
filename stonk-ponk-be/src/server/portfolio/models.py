from django.db import models

from stocks import stock_api

import uuid
import datetime

class Portfolio(models.Model) :
    email = models.EmailField(('email address'), unique=True)
    stocks = models.ManyToManyField("PortfolioStock", through = 'StockOwnership')
    last_update = models.DateField(null=True)
    
    def log_date(func):
        def inner(self=None, *args, **kwargs):
            if isinstance(self, Portfolio):
                self.last_update = datetime.date.today()
                self.save()
            return func(self, *args, **kwargs)
        return inner

    @log_date
    def add_stock(self, ticker, date, volume, price):
        # get this from market price
        stock, created = PortfolioStock.objects.get_or_create(ticker=ticker)
        ownership, created = StockOwnership.objects.get_or_create(owner=self, stock=stock)
        ownership.VWAP = (ownership.VWAP * ownership.volume + price * volume) / (ownership.volume + volume)
        ownership.volume = ownership.volume + volume 
        ownership.save()

        transaction = Transaction.objects.create( 
                stockOwnership = ownership,
                purchase_date  = date, 
                purchase_vol   = volume,
                purchase_price = price)

    @log_date
    def remove_transaction(self, _uuid):
        trans_id = uuid.UUID(_uuid); 
        trans = Transaction.objects.get(id=trans_id)
        trans_price = trans.purchase_price
        trans_vol = trans.purchase_vol

        # update ownership
        ownership = trans.stockOwnership
        ownership.VWAP = (ownership.VWAP * ownership.volume - trans_price * trans_vol) / (ownership.volume - trans_volume)
        ownership.volume = ownership.volume - trans_vol
        ownership.save()

        # remove ownership if last transaction
        if ownership.volume == 0:
            ownership.delete()
        else:
            trans.delete()

    @log_date
    def update_transaction(self, _uuid, new_date, new_volume, new_price):
        if new_volume <= 0:
            return

        trans_id = uuid.UUID(_uuid); 
        trans = Transaction.objects.get(id=trans_id)
        old_price = trans.purchase_price
        old_volume = trans.purchase_vol
        vol_diff = new_volume - old_volume

        # update ownership
        ownership = trans.stockOwnership
        ownership.VWAP = (ownership.VWAP * ownership.volume - old_price * old_volume + new_price * new_volume) / (ownership.volume + vol_diff)
        ownership.volume = ownership.volume + vol_diff
        ownership.save()

        # update transaction
        trans.purchase_vol   = new_volume
        trans.purchase_price = new_price
        trans.purchase_date  = new_date
        trans.save()


    @log_date
    def remove_ownership(self, ticker):
        stock = PortfolioStock.objects.get(ticker=ticker)
        ownership = StockOwnership.objects.get(owner=self,stock=stock)
        ownership.delete()

    def get_all_transactions_for_stock(self, ticker):
        stock = PortfolioStock.objects.get(ticker=ticker)
        stockOwnership = StockOwnership.objects.get(owner=self,stock=stock)
        return Transaction.objects.filter(stockOwnership=stockOwnership)
    
    def get_stock_ownerships(self):
        return StockOwnership.objects.filter(owner=self)

    def get_value(self):
        tVal = 0
        for so in self.get_stock_ownerships():
            try:
                tVal += stock_api.get_price(so.get_stock_ticker()) * so.volume
            except:
                print("LOG: ERROR: could not process {} in get_value".format(so.get_stock_ticker()))
        return tVal

    def get_investment(self):
        tVal = 0
        for so in self.get_stock_ownerships():
            try:
                tVal += so.VWAP * so.volume
            except:
                print("LOG: ERROR: could not process {} in get_investment".format(so.get_stock_ticker()))
        return tVal

class PortfolioStock(models.Model):
    ticker = models.CharField(max_length = 20)

class StockOwnership(models.Model): 

    owner = models.ForeignKey("Portfolio", on_delete = models.CASCADE)
    stock = models.ForeignKey("PortfolioStock", on_delete = models.CASCADE)

    VWAP = models.FloatField(default=0)
    volume = models.IntegerField(default=0)
    first_purchase = models.DateField(null=True)
   
    def recalculate(self):
        tVol = 0
        tVal = 0
        minDate = datetime.date.today() 
        trans = Transaction.objects.filter(stockOwnership=self)
        for t in trans:
            tVol += t.purchase_vol
            tVal += t.purchase_price * t.purchase_vol
            minDate = min(minDate, t.purchase_date)

        self.volume = tVol
        self.VWAP = tVal / tVol
        self.first_purchase = minDate
        self.save()

    def get_stock_name(self):
        return self.stock.ticker 

    def get_stock_ticker(self):
        return self.stock.ticker

    def get_profit(self):
        return (self.volume*stock_api.get_price(self.get_stock_ticker)) - (self.volume * self.VWAP); 

    def get_percentage_profit(self):
        return (self.get_profit/(self.volume*self.VWAP)) * 100 

    def calc_profit_margin(self):
        return (stock_api.get_price(self.get_stock_ticker) - self.VWAP)/self.VWAP
    
class Transaction(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    purchase_date = models.DateField()
    purchase_vol = models.IntegerField(default=0)
    purchase_price = models.FloatField(default=0)
    stockOwnership = models.ForeignKey("StockOwnership", on_delete = models.CASCADE)
