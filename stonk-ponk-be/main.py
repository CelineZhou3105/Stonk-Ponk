import pymongo
from pymongo import MongoClient
import pprint
import database_func as db

#start up functions will be called to set up all connections. 
# After this we will start a listener to take commands from the frontend
def main():
    db_conn = db.start_db()

    #set up a server listener
    listen(db_conn)
    db.insert_user(db_conn, "Sampath", "Somanchi")
    db.delete_user(db_conn, "Sampath")
    print(db.check_user(db_conn, "Sampath"))

#Server listener 
def listen(db_conn):
    online = True
    while online: 
        command_dict = {"command": "insert", "username": "sampath", "password": "pingas"}
        
        action = get_func(db_conn, command_dict)

        if action == 'Quit':
            online = False
            continue

        if action == "Unknown": 
            print("We got an unknown command\n")

def get_func(db_conn, command_string):
    command = command_string["command"]

    if command == "insert":
        

if __name__ == '__main__':
    main()
