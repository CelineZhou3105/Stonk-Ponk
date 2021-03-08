import pymongo
from pymongo import MongoClient
import pprint

def main():
    db = start_db()
    insert_user(db, "Sampath", "Somanchi")
    delete_user(db, "Sampath", "Somanchi")
    print(check_user(db, "Sampath", "Somanchi"))
    
#Creates a connection to a mongodb created on localhost and returns db pointer/client
def start_db():
    client = MongoClient('localhost', 27017)

    db = client.test_database

    return db

#Inserts user if user already does not exist in the db
def insert_user(db, username, password):
    
    if(check_user(db, username, password)):
        print("User already exists")
    else:
        user_auths = db.user_auths

        user_auth = {"u_name": username, "pwd": password}

        user_auths.insert_one(user_auth).inserted_id
        pprint.pprint(user_auths.find_one())
    return 

#Removes user if they are in the db.
def delete_user(db, username, password):
    if check_user(db, username, password) == False:
        print("User does not exist")
        return
    
    user_auths = db.user_auths

    user_auth = {"u_name": username, "pwd": password}

    user_auths.delete_one(user_auth)

    return

#Checks if there is a user by this username
def check_user(db, username, password):
    if(db.user_auths.find_one({"u_name": username, "pwd": password})):
        return True
    
    return False

if __name__ == '__main__':
    main()
