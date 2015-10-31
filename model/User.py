import datetime
from mongokit import Document
from model import connection, db

__author__ = 'cyh'


@connection.register
class BlogUser(Document):
    __collection__ = 'blog_user'
    structure = {
        'username': basestring,
        'password': basestring,
        'roles': [basestring]
    }
    required_fields = ['username', 'password']


bp = db.BlogUser()
print bp

bp['username'] = "aaa"
bp['password'] = "password"
bp.validate()

print bp
# bp.save()
#print bp['_id']

print datetime.datetime.utcnow()

for co in db.BlogUser.find():
    print co, co['username']

