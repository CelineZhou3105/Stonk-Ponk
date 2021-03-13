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
        command_string = input("Please Enter a Command: \n")
        command = command_string.split()[0]
        
        action = get_func(command, command_string)

        if action == 'Quit':
            online = False
            continue

        if action == "Unknown": 
            print("We got an unknown command\n")

def get_func(command, command_string):
    return{
        'Quit': 'Quit',
        'Insert': 1
    }.get(command, 'Unknown')

if __name__ == '__main__':
    main()
