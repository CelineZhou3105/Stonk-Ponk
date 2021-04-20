from django.db import models

from api_interface.stock_api_interface import StockApiInterface as stock_api
from api_interface.forex_api_interface import ForexApiInterface as forex_api

import uuid
import datetime
import json

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
        
        au_value = forex_api.calc_forex_rate(tVal, "USD", "AUD")
        print("tVal ", tVal)
        print("au_val ", au_value)
        return tVal

    def get_investment(self):
        tVal = 0
        for so in self.get_stock_ownerships():
            try:
                tVal += so.VWAP * so.volume
            except:
                print("LOG: ERROR: could not process {} in get_investment".format(so.get_stock_ticker()))
        return tVal
    
    def get_beta(self):
        total_beta = 0 # beta * volume
        total_value= 0 # sum of all the volume used in calcuating the beta
        for so in self.get_stock_ownerships():
            ticker = so.stock.market_ticker

            beta = stock_api.get_beta(ticker)
            
            if beta != None:
                value = so.volume * stock_api.get_price(ticker)
                total_beta += beta * value
                total_value+= value

        value_weighted_beta = total_beta / total_value
        return value_weighted_beta

    '''
    Instead of investing the portfolio stocks, what would have been the profit if we invested with the market index instead
    '''
    def get_hypothetical_market_profit(self):
        profit = 0
        market_ticker = "^GSPC"
        market_index_price = stock_api.get_price(market_ticker)

        for so in self.get_stock_ownerships():
            for trans in Transaction.objects.filter(stockOwnership=so):
                price_dict = stock_api.get_historical_price(market_ticker, trans.purchase_date)
                mid_price = price_dict["low"] + price_dict["high"]
                profit += (market_index_price - mid_price) * trans.purchase_vol

        return profit 

    '''
    gets the price history of the current portfolio over the interval
    '''
    def get_historical_value(self, interval_type):
        stock_prices = [] # list of list
        stock_volume = [] # list
        
        dates = set()
        for so in self.get_stock_ownerships():
            ticker = so.stock.ticker
            prices = stock_api.get_stock_prices(ticker, interval_type)
            for e in prices:
                dates.add(e['date'])
            stock_prices.append(prices)
            stock_volume.append(so.volume)

        # iteration through set is not in order so we convert to sorted list
        dates = list(dates)
        dates.sort()

        # populate missing dates
        for prices in stock_prices:
            i = 0
            prev_price = prices[0]['price']
            for d in dates:
                if len(prices) <= i or d != prices[i]['date']:
                    prices.insert(i, { 'date': d, 'price': prev_price })
                else:
                    prev_price = prices[i]['price']
                i += 1

        portfolio_values = [0] * len(dates)
        for i in range(0, len(stock_prices)):
            for j in range(0, len(dates)):
                portfolio_values[j] += stock_prices[i][j]['price'] * stock_volume[i]

        return portfolio_values

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
        return stock_api.get_stock_data(self.stock.ticker)['name']

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
