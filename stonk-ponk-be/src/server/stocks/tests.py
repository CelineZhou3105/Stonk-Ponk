from django.test import TestCase
from api_interface.stock_api_interface import StockApiInterface as s_api
from api_interface.forex_api_interface import ForexApiInterface as f_api
from datetime import date, datetime, timedelta
# Create your tests here.
class ForexTestCase(TestCase):
    def setUp(self):
        self.f_api = f_api
        self.s_api = s_api
        self.from_currency = "USD"
        self.to_currency = "AUD"
    
    def test_forex_aud_usd(self):
        print(self.f_api.get_currency_exchange(self.from_currency, self.to_currency))
    
    def test_100_aud_usd(self):
        #print(self.f_api.calc_forex_rate(100, self.from_currency, self.to_currency))
        
        stock_api_list = [{"name":"yahoo_fin", "priority": 2},{"name":"alphavantage", "priority": 1}]
        self.s_api.set_stock_api_order(stock_api_list)

        #print(self.s_api.get_stock_data("AAPL"))

        #print(self.s_api.get_price("AAPL"))

        #print(self.s_api.get_stock_prices("AAPL", "market"))

        yesterday = date.today() - timedelta(days=1)
        print(self.s_api.get_historical_price("AAPL", yesterday))