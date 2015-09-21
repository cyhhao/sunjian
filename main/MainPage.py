import tornado

__author__ = 'cyh'


class MainPage(tornado.web.RequestHandler):
    def get(self):
        self.render("home.html", title="Home")

    def post(self):
        self.set_header("Content-Type", "text/plain")
        self.write("You wrote " + self.get_argument("message"))