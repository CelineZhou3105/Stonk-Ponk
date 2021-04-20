from django.test import TestCase
from api_interface.stock_api_interface import StockApiInterface as s_api
from api_interface.forex_api_interface import ForexApiInterface as f_api

# Create your tests here.
class ForexTestCase(TestCase):
    def setUp(self):
        self.f_api = f_api
        self.from_currency = "USD"
        self.to_currency = "AUD"
    
    def test_forex_aud_usd(self):
        print(self.f_api.get_currency_exchange(self.from_currency, self.to_currency))
    
    def test_100_aud_usd(self):
        print(self.f_api.calc_forex_rate(100, self.from_currency, self.to_currency))
    
