from mongokit import Connection

__author__ = 'cyh'

connection = Connection('127.0.0.1', 27017)
db = connection['test']
print db.authenticate('admin', 'admin')