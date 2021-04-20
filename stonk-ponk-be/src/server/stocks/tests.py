from django.test import TestCase
from api_interface.stock_api_interface import StockApiInterface as s_api
from api_interface.forex_api_interface import ForexApiInterface as f_api

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
        print(self.f_api.calc_forex_rate(100, self.from_currency, self.to_currency))
    
    def check_market_active_aa(self):
        stock_api_list = [{"name":"yahoo_fin", "priority": 2},{"name":"alpha_vantage", "priority": 1}]
        self.s_api.set_stock_api_order(stock_api_list)

        print(self.s_api.get_market_data("most_active"))
