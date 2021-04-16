from GoogleNews import GoogleNews
from yahoo_fin import news
from stocks import stock_api
import pandas as pd
import json
import requests
pd.set_option("display.max_rows", None, "display.max_columns", None)


def get_yf_news(ticker):
    try:
        news.get_yf_rss(ticker)
    except:
        raise Exception("News Error")

def get_yf_market_news():
    try:
        stock_data = stock_api.get_most_active(0,5)

        market_news = []
        
        for stock in stock_data:
            market_news.append(get_yf_news(stock))
        
        return json.dumps(market_news)

    
    except:
        raise Exception("Most Active Stocks Not Found")

#gets news for the last 1 week
def get_news(ticker):
    try:
        stock_data = stock_api.get_stock_data(ticker)
    except:
        raise Exception("Stock Not Found")
    
    try:
        googlenews = GoogleNews(period='3d')
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
        raise Exception("News Error")

def get_market_news():
    try:
        stock_data = stock_api.get_most_active(0,5)

        market_news = []
        
        for stock in stock_data:
            market_news.append(get_news(stock))
        
        return json.dumps(market_news)

    
    except:
        raise Exception("Most Active Stocks Not Found")
    
