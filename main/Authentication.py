import tornado
from main import BaseHandler
import settings

__author__ = 'cyh'


class Login(BaseHandler):
    # @tornado.web.authenticated
    def post(self):
        user = self.get_argument('user')
        password = self.get_argument('password')
        if user == settings.account["user"] and password == settings.account["password"]:
            self.set_secure_cookie("user", user)
            self.write("okok")
        else:
            self.write("nono")