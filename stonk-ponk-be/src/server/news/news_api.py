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
        googlenews.search(ticker)
        result = googlenews.result()
        
        news_articles = []
        for item in result:
            news_article = {}
            news_article['title'] = item['title']
            news_article['media'] = item['media']
            news_article['date'] = item['date']
            news_article['description'] = item['desc']
            news_article['link'] = item['link']
            news_articles.append(news_article)
            
        return json.dumps(news_articles)
    except:
        raise Error("News Error")