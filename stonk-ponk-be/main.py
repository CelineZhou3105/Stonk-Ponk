import pymongo
from pymongo import MongoClient
import pprint
import database_func as db

def main():
    db_conn = db.start_db()
    db.insert_user(db_conn, "Sampath", "Somanchi")
    db.delete_user(db_conn, "Sampath")
    print(db.check_user(db_conn, "Sampath"))


if __name__ == '__main__':
    main()
