from django.db import models

import uuid
import datetime

def getPrice(trans):
    return trans.purchase_price


class Portfolio(models.Model) :
    email = models.EmailField(('email address'), unique=True)
    stocks = models.ManyToManyField("PortfolioStock", through = 'StockOwnership')
    
    def add_stock(self, ticker, date, volume, price) :
        # get this from market price
        stock = PortfolioStock.objects.get(ticker=ticker)
        ownership, created = StockOwnership.objects.get_or_create(owner=self, stock=stock)
        ownership.VWAP = (ownership.VWAP * ownership.volume + price * volume) / (ownership.volume + volume)
        ownership.volume = ownership.volume + volume 
        ownership.save()

        transaction = Transaction.objects.create( 
                stockOwnership = ownership,
                purchase_date  = date, 
                purchase_vol   = volume,
                purchase_price = price)

   
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


    def remove_ownership(self, ticker):
        stock = PortfolioStock.objects.get(ticker=ticker)
        ownership = StockOwnership.objects.get(owner=self,stock=stock)
        ownership.delete()

    def get_all_transactions_for_stock(self, ticker):
        stock = PortfolioStock.objects.get(ticker=ticker)
        stockOwnership = StockOwnership.objects.get(owner=self,stock=stock)
        return Transaction.objects.filter(stockOwnership=stockOwnership)
    
    def get_stock_ownerships(self):
        return StockOwnership.objects.get(owner=self)

class PortfolioStock(models.Model):
    ticker = models.CharField(max_length = 20)

class StockOwnership(models.Model): 

    owner = models.ForeignKey("Portfolio", on_delete = models.CASCADE)
    stock = models.ForeignKey("PortfolioStock", on_delete = models.CASCADE)

    VWAP = models.FloatField(default=0)
    volume = models.IntegerField(default=0)
    first_purchase = models.DateField(null=True)
            #blank=True)
   
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

    def getStockName(self):
        return self.stock.ticker 

    def getStockTicker(self):
        return self.stock.ticker

    

    
class Transaction(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    purchase_date = models.DateField()
    purchase_vol = models.IntegerField(default=0)
    purchase_price = models.FloatField(default=0)
    stockOwnership = models.ForeignKey("StockOwnership", on_delete = models.CASCADE)
