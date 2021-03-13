import pymongo
from pymongo import MongoClient
import pprint
import database_func as database

class Server(object):
    def __init__(self):
        self.num_connections = 1
        self.db = database.Database()

    def request_handler(self, command_dict):
        
        self.get_func(command_dict)


    def get_func(self, command_string):
        command = command_string["command"]
        username = command_string["username"]

        if command == "insert":
            password = command_string["password"]
            return self.db.insert_user(username, password)
        
        elif command == "delete":
            return self.db.delete_user(username)
        
        elif command == "check":
            return self.db.check_user(username)
        
        elif command == "replace":
            password = command_string["new_password"]
            return self.db.replace_pwd(username, password)
