import tornado
from main import BaseHandler

__author__ = 'cyh'

class empty(BaseHandler):
    def get(self):
        self.write(" ")

class MainPage(BaseHandler):
    def get(self):
        self.render("home.html", title="Home")
