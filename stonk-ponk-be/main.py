import pymongo
from pymongo import MongoClient
import pprint

client = MongoClient('localhost', 27017)
db = client.test_database
print("got here")
collection = db['test-collection']

user_auth = {"u_name": "Ash",
"pwd": "Sarkar"}

user_auths = db.user_auths
auth_id = user_auths.insert_one(user_auth).inserted_id

pprint.pprint(user_auths.find_one())