from yahoo_fin import news as yf_news
from api_interface.stock_api_interface import StockApiInterface as stock_api
import pandas as pd
import requests
import json
import requests
pd.set_option("display.max_rows", None, "display.max_columns", None)

class YfNewsApi():
    def __init__(self):
        self.num_calls = 0
        self.api = yf_news
    
    def get_news(self, ticker):
        try:
            news_articles = self.api.get_yf_rss(ticker)
            news_articles = news_articles[:5]

            return_articles = []

            for article in news_articles:
                news_dict = {}
                news_dict['ticker'] = ticker
                news_dict['summary'] = article['summary'][:100]
                news_dict['link'] = article['link']
                news_dict['published'] = article['published'][:16]
                news_dict['title'] = article['title']
                return_articles.append(news_dict)
        
            return return_articles
        except:
            raise Exception("No Articles Found")

    def get_market_news(self):
        try:
            stock_data = stock_api.get_most_active(0,10)

            market_news = []
        
            for index, row in stock_data.iterrows():
                articles = self.get_news(row['Symbol'])
                articles = articles[:2]
            
                for article in articles:
                    market_news.append(article)

            return market_news

        except:
            raise Exception("Most Active Stocks Not Found")
    
    def get_num_calls(self):
        return self.num_calls