# coding:utf-8
from time import sleep
import tornado
from main import BaseHandler, resJSON
import settings

__author__ = 'cyh'


class Login(BaseHandler):
    # @tornado.web.authenticated
    def post(self):
        user = self.get_argument('user')
        password = self.get_argument('password')
        sleep(1.5)  # 看UI效果
        if user == settings.account["user"] and password == settings.account["password"]:
            self.set_secure_cookie("user", user)
            self.write(resJSON(1, '登陆成功'))
        else:
            self.write(resJSON(0, '用户名或密码不正确'))