from GoogleNews import GoogleNews
from stocks import stock_api
import pandas as pd
import json
import requests
pd.set_option("display.max_rows", None, "display.max_columns", None)

#gets news for the last 1 week
def get_news(ticker):
    try:
        stock_data = stock_api.get_stock_data(ticker)
    except:
        raise Exception("Stock Not Found")
    
    try:
        googlenews = GoogleNews(period='7d')
        googlenews.search(stock_data['name'])
        result = json.dumps(googlenews.result())
        for item in result:
            item.pop('datetime')
            
        return result
    except:
        raise Error("News Error")