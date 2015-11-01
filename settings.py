# coding:utf-8
import os

__author__ = 'cyh'
settings = {
    "static_path": os.path.join(os.path.dirname(__file__), "static"),
    "template_path": os.path.join(os.path.dirname(__file__), "template"),
    "gzip": True,
    "debug": True,
    "cookie_secret": "T1RkQ1F6UXhSamt6UkRjNU9UTTFSa0kxUVVWQ1FqYzFOemsyT1RFMFJFUT0=",  # 这里注意要修改
    "xsrf_cookies": True,
    "login_url": "/",
}

account = {
    'user': 'root',
    'password': '123456'
}