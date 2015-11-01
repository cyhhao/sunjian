import tornado.ioloop
import tornado.web
from settings import settings
from route.All import urls

__author__ = 'cyh'

application = tornado.web.Application(urls, **settings)

if __name__ == "__main__":
    application.listen(6109)
    tornado.ioloop.IOLoop.instance().start()
    print "start ok"