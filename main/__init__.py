import json
import tornado

__author__ = 'cyh'


class BaseHandler(tornado.web.RequestHandler):
    def get_current_user(self):
        return self.get_secure_cookie("user")


def resJSON(status, msg="", data=None):
    res = {
        'code': status,
        'msg': msg
    }
    if data:
        res['data'] = data
    return json.dumps(res)