from api_interface.stock_api_interface import StockApiInterface as api
#from stock_api_interface import StockApiInterface as api
#from stocks import stock_api as yf_stocks

def main():
    print(api.get_stock_api_order())
    new_list = [{"name":"yahoo_fin", "priority": 2},{"name":"alpha_vantage", "priority": 1}]

    if api.set_stock_api_order(new_list):
        print(api.get_stock_api_order())

    print(api.get_market_status())

    print(api.get_most_active(0, 10))

    print(api.get_market_data("most_active", 0))

    print(api.get_price("AAPL"))
if __name__ == '__main__':
    main()