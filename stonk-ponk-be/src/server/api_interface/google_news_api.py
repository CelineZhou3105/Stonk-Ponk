from GoogleNews import GoogleNews
from stocks import stock_api
import pandas as pd
import requests
import json
import requests
pd.set_option("display.max_rows", None, "display.max_columns", None)

class GoogleNewsApi():
    def __init__(self):
        self.num_calls = 0
        self.api = GoogleNews(period='5d')
    
    def get_news(self, ticker):
        try:
            stock_data = stock_api.get_stock_data(ticker)
        except:
            raise Exception("Stock Not Found")
    
        try:
            articles_result = self.api.search(ticker).result()
        
            news_articles = []
            
            for item in articles_result:
                news_dict = {}
                news_dict['ticker'] = ticker
                news_dict['summary'] = item['desc']
                news_dict['link'] = item['link']
                news_dict['published'] = item['date']
                news_dict['title'] = item['title']

                news_dict.append(news_dict)
            
            return news_dict
        
        except:
            raise Exception("No Articles Found")

    def get_market_news(self):
        try:
            stock_data = stock_api.get_most_active(0,10)

            market_news = []
        
            for stock in stock_data:
                articles = self.get_news(stock)
                articles = articles[:2]
            
            for article in articles:
                market_news.append(article)

            return market_news

        except:
            raise Exception("Most Active Stocks Not Found")
    
    def get_num_calls(self):
        return self.num_calls