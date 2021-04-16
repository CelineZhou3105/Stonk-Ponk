from django.db import models

from stocks import stock_api

import uuid
import datetime
import json
import math

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

    def get_value(self, date=datetime.date.today()):
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
    
    def get_health(self):
        #will get out of 100 points for all 3 and this function will return them in a dict
        diversification_score = self.calc_diversification()
        #profit_score = 
        #calc_profit
        #calc_benchmark
        #health_dict = {}
        health_dict['diversification'] = div_points
        return health_dict
    
    def calc_diversification_score(self):
        #gets weightage of stocks 
        #checks asset allocations
        #we calculate portfolio beta which is the portfolio's volatility in relation to the overall market

        total_beta = 0 # beta * volume
        total_value= 0 # sum of all the volume used in calcuating the beta
        for so in self.get_stock_ownerships():
            ticker = so.stock.ticker
            stats = stock_api.get_stats(ticker)
            beta = None
            for index, df in stats.iterrows():
                if df["Attribute"] == "Beta (5Y Monthly)":
                    beta = df["Value"] 
                    break
            if beta != None:
                value = so.volume * stock_api.get_price(ticker)
                total_beta += float(beta) * value
                total_value+= value

        if total_value == 0:
            return 0

        value_weighted_beta = total_beta / total_value

        # normal distribution around 1 scaled to 100
        return math.e**(-(value_weighted_beta-1)**2) * 100

    def calc_profit_score(self):
        # go through all the transactions and purchase the same amount
        profit_portfolio = self.get_value() - self.get_investment() 
        for so in self.get_stock_ownerships():
            for trans in Transaction.objects.filter(stockPortfolio=so):
                price_dict = get_historical_price("^GSPC", trans.purchase_date)
                midprice = price_dict["low"] + price_dict["high"]
                
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
        return json.loads(stock_api.get_stock_data(self.stock.ticker))['name']

    def get_stock_ticker(self):
        return self.stock.ticker

    def get_profit(self):
        return stock_api.get_price(self.get_stock_ticker() - self.VWAP) * self.volume

    def calc_profit_margin(self):
        return (stock_api.get_price(self.get_stock_ticker())/self.VWAP - 1) * 100
    
class Transaction(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    purchase_date = models.DateField()
    purchase_vol = models.IntegerField(default=0)
    purchase_price = models.FloatField(default=0)
    stockOwnership = models.ForeignKey("StockOwnership", on_delete = models.CASCADE)
