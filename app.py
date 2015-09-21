import tornado.ioloop
import tornado.web
from settings import settings
from route.route import urls

__author__ = 'cyh'

application = tornado.web.Application(urls, **settings)

if __name__ == "__main__":
    application.listen(80)
    tornado.ioloop.IOLoop.instance().start()
    print "start ok"