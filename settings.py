import os

__author__ = 'cyh'
settings = {
    "static_path": os.path.join(os.path.dirname(__file__), "public"),
    "template_path": os.path.join(os.path.dirname(__file__), "template"),
    "gzip": True,
    "debug": True,
    "cookie_secret": "cyhhao",
    "xsrf_cookies": True,
}

