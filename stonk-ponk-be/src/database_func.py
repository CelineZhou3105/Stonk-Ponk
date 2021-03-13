import pymongo
from pymongo import MongoClient
import pprint
import os
#This module has the functions which connect to a mongodb and operate on it. 
#Db rules: No 2 users can have the same username

class Database(object):
    def __init__(self):
        self.conn = self.start_db()


    #Creates a connection to a mongodb created on localhost and returns db pointer/client
    def start_db(self):
        client = MongoClient('localhost', 27017)

        db_conn = client.test_database
        db_conn.user_auths.remove()
        os.system("mongoimport --jsonArray --db='test_database'  --collection='user_auths' --file='bootstrap.json'")
        return db_conn

    #Inserts user if user already does not exist in the db
    def insert_user(self, username, password):
    
        if(self.check_user(username)):
            print("User already exists")
        else:
            user_auths = self.conn.user_auths

            user_auth = {"u_name": username, "pwd": password}

            user_auths.insert_one(user_auth).inserted_id
            pprint.pprint(user_auths.find_one())
        return 

    #Removes user if they are in the db.
    def delete_user(self,username):
        if self.check_user(username) == False:
            print("User does not exist")
            return
    
        user_auths = self.conn.user_auths

        user_auth = {"u_name": username}

        user_auths.delete_one(user_auth)

        return

    #Checks if there is a user by this username
    def check_user(self, username):
        if(self.conn.user_auths.find_one({"u_name": username})):
            return True
    
        return False

    #Replaces the user with a new user
    def replace_pwd(self, username, new_password):
        if not self.check_user(username):
            return "User Does not Exist"
        else: 
            self.delete_user(username)
            self.insert_user(username, new_password)
    
    def check_auth(self, username, password):
        if(self.conn.user_auths.find_one({"u_name": username, "pwd": password})):
            return True
    
        return False




