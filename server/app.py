#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import User, UserListing, Listing, Business
import secrets
from dotenv import load_dotenv
import os

import ipdb

load_dotenv()
SECRET_KEY = os.getenv('SECRET_KEY')
app.secret_key = SECRET_KEY

# Views go here!

class Login(Resource):
    def post(self):
        try:
            current_id = request.get_json()['user_id']
            current_user = User.query.filter_by(id=current_id).first().to_dict()
            if current_user:
                session['current_id'] = current_id
                return make_response(current_user, 200)
        except Exception:
            return make_response({}, 404)

class Logout(Resource):
    def get(self):
        try:
            session['current_id'] = '0'
            return make_response({}, 200)
        except Exception:
            return make_response({}, 400)

class CurrentUser(Resource):
    def get(self):
        try:
            current_id = session['current_id']
            current_user = User.query.filter_by(id=current_id).first().to_dict()
            if current_user:
                return make_response(current_user, 200)
        except Exception:
            return make_response({}, 404)

api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CurrentUser, '/currentuser')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

