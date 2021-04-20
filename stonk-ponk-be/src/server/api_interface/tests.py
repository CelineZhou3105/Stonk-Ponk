from django.test import TestCase
from api_interface.stock_api_interface import StockApiInterface as s_api

# Create your tests here.
class StockTestCase(TestCase):
    def setUp(self):
        self.api = s_api
    
    def check_market_active_aa(self):
        stock_api_list = [{"name":"yahoo_fin", "priority": 2},{"name":"alpha_vantage", "priority": 1}]
        self.api.set_stock_api_order(stock_api_list)

        print(self.api.get_market_data("most_active"))