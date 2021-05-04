from GoogleNews import GoogleNews
from yahoo_fin import news
from stocks import stock_api
import pandas as pd
import requests
import json
import requests
pd.set_option("display.max_rows", None, "display.max_columns", None)


def get_yf_news(ticker):
    try:
        news_articles = news.get_yf_rss(ticker)
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
        raise Exception("News Error")

def get_yf_market_news():
    try:
        stock_data = stock_api.get_most_active(0,10)

        market_news = []
        
        for stock in stock_data:
            articles = get_yf_news(stock)
            articles = articles[:2]
            for article in articles:
                market_news.append(article)
        
        print(len(market_news))
        return market_news

    
    except:
        raise Exception("Most Active Stocks Not Found")

#gets news for the last 1 week
def get_news(ticker):
    try:
        stock_data = stock_api.get_stock_data(ticker)
    except:
        raise Exception("Stock Not Found")
    
    try:
        googlenews = GoogleNews(period='2d')
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
            news_article['datetime'] = item['datetime']
            news_articles.append(news_article)
            
        return news_articles
    except:
        raise Exception("News Error")

def get_market_news():
    try:
        stock_data = stock_api.get_most_active(0, 5)

        market_news = []
        for stock in stock_data:
            stock_news = get_news(stock)
            for article in stock_news:
                if article['datetime'] == None: 
                    article['datetime'] = datetime.datetime(1900, 1, 1)
                market_news.append(article)
        
        market_news.sort(reverse=True, key=lambda x:x['datetime'])

        for article in market_news:
            article.pop('datetime')
        
        return market_news

    
    except:
        raise Exception("Most Active Stocks Not Found")
    
