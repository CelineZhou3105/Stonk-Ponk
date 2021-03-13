import pymongo
from pymongo import MongoClient
import pprint
import database_func as database
import server

#start up functions will be called to set up all connections. 
# After this we will start a listener to take commands from the frontend
def main():
    be_server = server.Server()

    command_dict = {"command": "insert", "username": "sampath", "password": "pingas"}
    be_server.request_handler(command_dict)

    command_dict = {"command": "delete", "username": "sampath"}
    be_server.request_handler(command_dict)

    command_dict = {"command": "check", "username": "sampath"}
    if be_server.request_handler(command_dict) == False:
        print("User Sampath Does Not Exist")


if __name__ == '__main__':
    main()
