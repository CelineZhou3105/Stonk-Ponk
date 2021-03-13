import pymongo
from pymongo import MongoClient
import pprint

#This module has the functions which connect to a mongodb and operate on it. 
#Db rules: No 2 users can have the same username

#Creates a connection to a mongodb created on localhost and returns db pointer/client
def start_db():
    client = MongoClient('localhost', 27017)

    db = client.test_database

    return db
#Inserts user if user already does not exist in the db
def insert_user(db_conn, username, password):
    
    if(check_user(db_conn, username)):
        print("User already exists")
    else:
        user_auths = db_conn.user_auths

        user_auth = {"u_name": username, "pwd": password}

        user_auths.insert_one(user_auth).inserted_id
        pprint.pprint(user_auths.find_one())
    return 

#Removes user if they are in the db.
def delete_user(db_conn, username):
    if check_user(db_conn, username) == False:
        print("User does not exist")
        return
    
    user_auths = db_conn.user_auths

    user_auth = {"u_name": username}

    user_auths.delete_one(user_auth)

    return

#Checks if there is a user by this username
def check_user(db_conn, username):
    if(db_conn.user_auths.find_one({"u_name": username})):
        return True
    
    return False

#Replaces the user with a new user
def replace_pwd(db_conn, username, password):
    if not check_user(db_conn, username):
        return "User Does not Exist"
    else: 
        delete_user(db_conn, username)
        insert_user(db_conn, username, password)

