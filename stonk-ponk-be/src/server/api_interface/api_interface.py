from stocks import stock_api as yf_stocks

class ApiInterface:
    stock_api_order = {"name":"yahoo_fin", "api": yf_stocks, "priority": 1}

    def get_stock_api_order():
        return stock_api_order
    
    def set_stock_api_order(order_dict):
        stock_api_order = order_dict
    