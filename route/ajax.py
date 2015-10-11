from main.Authentication import Login, getStatu, Logout

__author__ = 'cyh'
urls = [
    (r'/ajax/login', Login),
    (r'/ajax/getStatu', getStatu),
    (r'/ajax/logout', Logout),
]