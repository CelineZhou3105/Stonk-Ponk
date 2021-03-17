import pymongo
from pymongo import MongoClient
import pprint

from . import database

# interface to interact with an active mongo db server
# singleton pattern
class queryHandler(object):
    _instance = None 
    _db = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(queryHandler, cls).__new__(cls)
            cls._db = database.database()
            
        return cls._instance

    def request_handler(self, command_dict):
        self.get_func(command_dict)


    def get_func(self, command_string):
        command = command_string["command"]
        username = command_string["username"]

        if command == "insert":
            password = command_string["password"]
            return self._db.insert_user(username, password)
        
        elif command == "delete":
            return self._db.delete_user(username)
        
        elif command == "check":
            return self._db.check_user(username)
        
        elif command == "replace":
            password = command_string["new_password"]
            return self._db.replace_pwd(username, password)
        
        elif command == "auth":
            password = command_string["password"]
            return self._db.auth(username, password)
        
        elif command == "set_password_security" :
            password = command_string["password"]
            question = command_string["question"]
            return self._db.set_pwd_security(username, question, answer) 



if __name__=='__main__':
    a = queryHandler()
