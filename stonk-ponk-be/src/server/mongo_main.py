import pymongo
from pymongo import MongoClient
import pprint

from mongo import queryHandler
from stock_api import stock_api 

#start up functions will be called to set up all connections. 
# After this we will start a listener to take commands from the frontend
def main():
    be_server = queryHandler.queryHandler()
    #We will test to see if we can get AAPL stock data
    stock_api.get_market_status()
    stock_api.get_price("AAPL")


if __name__ == '__main__':
    main()
