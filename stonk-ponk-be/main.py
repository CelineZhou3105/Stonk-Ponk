import pymongo
from pymongo import MongoClient
import pprint

def main():
    db = start_db()
    

def start_db():
    client = MongoClient('localhost', 27017)
    db = client.test_database

    user_auths = db.user_auths

    pprint.pprint(user_auths.find_one())
    return db

def insert_user(username, password):

def delete_user(username, password):


if __name__ == '__main__':
    main()
