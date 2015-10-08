from main.MainPage import MainPage, empty
from route import ajax

__author__ = 'cyh'

urls = [
    (r"/", MainPage),
    (r"/html/empty", empty),
]+ajax.urls