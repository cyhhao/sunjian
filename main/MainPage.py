import tornado

__author__ = 'cyh'

class empty(tornado.web.RequestHandler):
    def get(self):
        self.write(" ")

class MainPage(tornado.web.RequestHandler):
    def get(self):
        self.render("home.html", title="Home")
