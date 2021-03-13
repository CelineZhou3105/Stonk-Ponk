#Server listener 
def request_handler(command_dict):
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
        return