#!/bin/bash

cd stonk-ponk-fe

npm start &

cd ..

cd stonk-ponk-be

if [ -ne virtual ]; then
	virtualenv -p python3 virtual
	pip3 install -r requirements.txt
fi

source virtual/bin/activate

cd src/server

mongod &
python3 manage.py runserver 
