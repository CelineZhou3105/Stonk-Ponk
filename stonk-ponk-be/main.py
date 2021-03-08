import pymongo
from pymongo import MongoClient
import pprint

def main():
    start_db()
    

def start_db():
    client = MongoClient('localhost', 27017)
    db = client.test_database

    user_auth = {"u_name": "Ash",
    "pwd": "Sarkar"}

    user_auths = db.user_auths

    pprint.pprint(user_auths.find_one())
if __name__ == '__main__':
    main()