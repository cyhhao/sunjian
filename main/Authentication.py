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
            self.set_secure_cookie("user_type", "1")
            self.write(resJSON(1, '登陆成功'))
        else:
            self.write(resJSON(0, '用户名或密码不正确'))


class getStatu(BaseHandler):
    def get(self):
        if self.get_current_user() is not None:
            self.write(resJSON(1, "获取成功", {
                'name': self.get_secure_cookie('user'),
                'type': int(self.get_secure_cookie('user_type'))
            }))
        else:
            self.write(resJSON(1, "获取成功", {
                'name': None,
                'type': 0
            }))


class Logout(BaseHandler):
    def post(self):
        self.clear_cookie("user")
        self.clear_cookie("user_type")

        self.write(resJSON(1, "登出成功"))