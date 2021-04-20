from django.db import models
from account.models import User

class Watchlist(models.Model):
    # id is implied
     
    user = models.ForeignKey(User, on_delete = models.CASCADE) 
    name = models.CharField(max_length=30)

    def add_stock(self, ticker):
        stockwatch, created = StockWatch.objects.get_or_create(ticker=ticker, watchlist=self)

    def del_stock(self, ticker):
        try:
            sw = StockWatch.objects.filter(ticker=ticker, watchlist=self)[0]
            sw.delete()
        except IndexError:
            # could not find stock ie stock is already deleted
            pass

    def save_stocks(self, tickers):
        for sw in StockWatch.objects.filter(watchlist=self):
            if sw.ticker not in tickers:
                self.del_stock(sw.ticker)
        for ticker in tickers:
            self.add_stock(ticker)

#in future this will be an intermediary class with references to:
#Watchlist
#Stock
class StockWatch(models.Model):
    ticker = models.CharField(max_length=10)
    watchlist = models.ForeignKey(Watchlist, on_delete = models.CASCADE) 
