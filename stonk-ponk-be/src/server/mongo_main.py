import pymongo
from pymongo import MongoClient
import pprint

from mongo import queryHandler

#start up functions will be called to set up all connections. 
# After this we will start a listener to take commands from the frontend
def main():
    be_server = queryHandler.queryHandler()


if __name__ == '__main__':
    main()
