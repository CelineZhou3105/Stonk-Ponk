from stocks import stock_api as si
from datetime import date, datetime, timedelta
from news import news_api
import json

def main():
    #print(si.check_stocks("WES"))
    print(json.dumps(news_api.get_yf_market_news()))
    #print(si.get_stock_prices("AAPL", "last_year"))
if __name__ == '__main__':
    main()
