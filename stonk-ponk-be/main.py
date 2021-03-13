import pymongo
from pymongo import MongoClient
import pprint
import database_func as db

#start up functions will be called to set up all connections. After this we will start a listener to take commands from the frontend
def main():
    db_conn = db.start_db()

    #set up a listener
    listen(db_conn)
    db.insert_user(db_conn, "Sampath", "Somanchi")
    db.delete_user(db_conn, "Sampath")
    print(db.check_user(db_conn, "Sampath"))

def listen(db_conn):
    online = True
    while online: 
        command = input("Please Enter a Command: \n")
        
        if command == "Quit":
            online = False
            continue


if __name__ == '__main__':
    main()
