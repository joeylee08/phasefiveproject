#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import User, UserListing, Listing, Business
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
            login_type = request.get_json()['login_type']
             
            if login_type == 'user':   
                current_user = User.query.filter_by(id=current_id).first().to_dict()
                session['login_type'] = 'user'
                
            else:
                current_user = Business.query.filter_by(id=current_id).first().to_dict() 
                session['login_type'] = 'business'
            
            if current_user:
                    session['current_id'] = current_id
                    return make_response(current_user, 200)
            else:
                return make_response({}, 400)

        except Exception:
            return make_response({}, 404)

class Logout(Resource):
    def get(self):
        try:
            session['current_id'] = '0'
            session['login_type'] = ''
            return make_response({}, 200)
        except Exception:
            return make_response({}, 400)
        
class Signup(Resource):
    def post(self):
        try:
            body = request.get_json()

            if body['login_type'] == 'user':
                new_user = User(**body)
                session['login_type'] = 'user'
            else:
                new_user = Business(**body)
                session['login_type'] = 'business'

            db.session.add(new_user)
            db.session.commit()
            session['current_id'] = new_user.id
            return make_response(new_user.to_dict(), 201)
        except Exception:
            db.session.rollback()
            return make_response({}, 400)

class CurrentUser(Resource):
    def get(self):
        try:
            current_id = session['current_id']
            login_type = session['login_type']
            if login_type == 'user':
                current_user = User.query.filter_by(id=current_id).first().to_dict()
            else:
                current_user = Business.query.filter_by(id=current_id).first().to_dict()
            
            if current_user:
                return make_response(current_user, 200)
        except Exception:
            return make_response({}, 404)

class Listings(Resource):
    def get(self):
        try:
            all_listings = [listing.to_dict() for listing in Listing.query]
            return make_response(all_listings, 200)
        except Exception:
            return make_response({}, 404)
        
    def post(self):
        try:
            body = request.get_json()
            new_listing = Listing(**body)
            db.session.add(new_listing)
            db.session.commit()
            return make_response(new_listing.to_dict(), 201)
        except Exception:
            db.session.rollback()
            return make_response({}, 400)

class ListingById(Resource):
    def get(self, id):
        try:
            target = db.session.get(Listing, id)
            return make_response(target.to_dict(), 200)
        except Exception:
            return make_response({}, 404)
        
    def patch(self, id):
        pass

    def delete(self, id):
        try:
            target = db.session.get(Listing, id)
            db.session.delete(target)
            db.session.commit()
            return make_response({}, 204)
        except Exception:
            db.session.rollback()
            return make_response({}, 404)
        
class UserListings(Resource):
    def post(self):
        try:
            body = request.get_json()
            new_ul = UserListing(**body)
            db.session.add(new_ul)
            db.session.commit()
            return make_response(new_ul.to_dict(), 201)
        except Exception:
            db.session.rollback()
            return make_response({}, 400)
        
class UserListingById(Resource):
    def delete(self, id):
        try:
            target = db.session.get(UserListing, id)
            db.session.delete(target)
            db.session.commit()
            return make_response({}, 204)
        except Exception:
            db.session.rollback()
            return make_response({}, 404)

class UserById(Resource):
    def get(self, id):
        try:
            target = db.session.get(User, id)
            return make_response(target.to_dict(), 200)
        except Exception:
            return make_response({}, 404)
        
    def patch(self, id):
        pass

    def delete(self, id):
        try:
            target = db.session.get(User, id)
            db.session.delete(target)
            db.session.commit()
            return make_response({}, 204)
        except Exception:
            db.session.rollback()
            return make_response({}, 404)

class BusinessById(Resource):
    def get(self, id):
        try:
            target = db.session.get(Business, id)
            return make_response(target.to_dict(), 200)
        except Exception:
            return make_response({}, 404)
        
    def patch(self, id):
        pass

    def delete(self, id):
        try:
            target = db.session.get(Business, id)
            db.session.delete(target)
            db.session.commit()
            return make_response({}, 204)
        except Exception:
            db.session.rollback()
            return make_response({}, 404)

api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Signup, '/signup')
api.add_resource(CurrentUser, '/currentuser')
api.add_resource(Listings, '/listings')
api.add_resource(UserListings, '/userlistings')
api.add_resource(UserById, '/userbyid/<int:id>')
api.add_resource(BusinessById, '/businessbyid/<int:id>')
api.add_resource(ListingById, '/listingbyid/<int:id>')
api.add_resource(UserListingById, '/userlistingbyid/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

