from django.test import TestCase
from api_interface.stock_api_interface import StockApiInterface as s_api
from api_interface.forex_api_interface import ForexApiInterface as f_api

# Create your tests here.
class ForexTestCase(TestCase):
    def setUp(self):
        self.f_api = f_api
    
    def test_forex_aud_usd(self):
        from_currency = "USD"
        to_currency = "AUD"
        print(self.f_api.get_currency_exchange(from_currency, to_currency))
        