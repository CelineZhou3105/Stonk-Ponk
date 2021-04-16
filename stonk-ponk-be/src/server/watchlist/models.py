from django.db import models

class Watchlist(models.Model):
    # id is implied
    user_id = models.IntegerField()
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

class StockWatch(models.Model):
    ticker = models.CharField(max_length=10)
    watchlist = models.IntegerField()
