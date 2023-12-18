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
from datetime import datetime

load_dotenv()
SECRET_KEY = os.getenv('SECRET_KEY')
app.secret_key = SECRET_KEY

# Views go here!

class Login(Resource):
    def post(self):
        try:
            username = request.get_json()['username']
            password = request.get_json()['password']
            login_type = request.get_json()['login_type']
             
            if login_type == 'user':   
                current_user = User.query.filter_by(username=username).first()

                if not current_user or not current_user.authenticate(password):
                    return make_response({"error" : "invalid credentials"}, 422)
                
                session['login_type'] = 'user'               
            else:
                current_user = Business.query.filter_by(username=username).first()

                if not current_user or not current_user.authenticate(password):
                    return make_response({"error" : "invalid credentials"}, 422)
                
                session['login_type'] = 'business'
            
            if current_user:
                
                    session['current_id'] = current_user.id
                    return make_response(current_user.to_dict(), 200)
            else:
                return make_response({}, 404)

        except Exception as e:
            return make_response({'error' : str(e)}, 404)

class Logout(Resource):
    def get(self):
        try:
            session['current_id'] = '0'
            session['login_type'] = ''
            return make_response({}, 200)
        except Exception:
            return make_response({"error" : "unable to logout user"}, 400)
        
class Signup(Resource):
    def post(self):
        try:
            body = request.get_json()
            if body['login_type'] == 'user':
                new_user = User(
                    login_type=body['login_type'],
                    email=body['email'],
                    username=body['username'],
                    _password_hash=''
                )
                session['login_type'] = 'user'
            else:
                new_user = Business(
                    login_type=body['login_type'],
                    business_name=body['business_name'],
                    username=body['username'],
                    email=body['email'],
                    _password_hash=''
                )
                session['login_type'] = 'business'

            new_user.password_hash = body['password']
            db.session.add(new_user)
            db.session.commit()
            session['current_id'] = new_user.id
            return make_response(new_user.to_dict(), 201)
        except Exception as e:
            db.session.rollback()
            return make_response({"error" : str(e)}, 400)

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
            all_listings.sort(key=lambda item: datetime.strptime(item['created_at'], '%Y-%m-%d %H:%M:%S').timestamp() , reverse=True)

            return make_response(all_listings, 200)
        except Exception:
            return make_response({}, 404)
        
    def post(self):
        try:
            if session['login_type'] != 'business':
                return make_response({"error" : "unauthorized to create listing"}, 422)
            
            body = request.get_json()
            new_listing = Listing(**body)
            db.session.add(new_listing)
            db.session.commit()
            return make_response(new_listing.to_dict(), 201)
        except Exception as e:
            db.session.rollback()
            return make_response({"error" : str(e)}, 400)

class ListingById(Resource):
    def get(self, id):
        try:
            target = db.session.get(Listing, id)
            return make_response(target.to_dict(), 200)
        except Exception:
            return make_response({}, 404)
        
    def patch(self, id):
        try:
            if session['login_type'] != 'business':
                return make_response({"error" : "unauthorized to update listing"}, 422)
            
            new_data = request.get_json()
            selected = db.session.get(Listing, id)
            for key in new_data:
                if new_data[key] == '' or new_data[key] == 0:
                    continue
                setattr(selected, key, new_data[key])
            db.session.add(selected)
            db.session.commit()
            return make_response(selected.to_dict(), 200)
        except Exception as e:
            db.session.rollback()
            return make_response({"error" : str(e)}, 400)

    def delete(self, id):
        try:
            if session['login_type'] != 'business':
                return make_response({"error" : "unauthorized to delete listing"}, 422)
            
            target = db.session.get(Listing, id)
            db.session.delete(target)
            db.session.commit()
            return make_response({}, 204)
        except Exception as e:
            db.session.rollback()
            return make_response({"error" : str(e)}, 400)
        
class UserListings(Resource):
    def post(self):
        try:
            if session['login_type'] != 'user':
                return make_response({"error" : "unauthorized to create userlisting"}, 422)
            
            body = request.get_json()
            new_ul = UserListing(**body)
            db.session.add(new_ul)
            db.session.commit()
            return make_response(new_ul.to_dict(), 201)
        except Exception as e:
            db.session.rollback()
            return make_response({"error" : str(e)}, 400)
        
class ULByUserId(Resource):
    def get(self, id):
        try:
            if session['login_type'] != 'user':
                return make_response({"error" : "unauthorized to access userlistings"}, 422)
            
            user_listings = [ul.to_dict() for ul in UserListing.query.filter_by(user_id=id).all()]
            
            return make_response(user_listings, 200)
        except Exception:
            return make_response({}, 404)

class UserListingById(Resource):
    def get(self, id):
        pass
    def delete(self, id):
        try:
            if session['login_type'] != 'user':
                return make_response({"error" : "unauthorized to delete userlisting"}, 422)
            
            target = db.session.get(UserListing, id)
            db.session.delete(target)
            db.session.commit()
            return make_response({}, 204)
        except Exception as e:
            db.session.rollback()
            return make_response({"error" : str(e)}, 400)

class UserById(Resource):
    def get(self, id):
        try:
            target = db.session.get(User, id)
            return make_response(target.to_dict(), 200)
        except Exception:
            return make_response({}, 404)
        
    def patch(self, id):
        try:
            if session['login_type'] != 'user':
                return make_response({"error" : "unauthorized to update profile"}, 422)
            
            new_data = request.get_json()
            selected = db.session.get(User, id)
            for key in new_data:
                if new_data[key] == '' or new_data[key] == 0:
                    continue
                setattr(selected, key, new_data[key])
            db.session.add(selected)
            db.session.commit()
            return make_response(selected.to_dict(), 200)
        except Exception as e:
            db.session.rollback()
            return make_response({"error" : str(e)}, 400)

    def delete(self, id):
        try:
            if session['login_type'] != 'user':
                return make_response({"error" : "unauthorized to delete profile"}, 422)
    
            target = db.session.get(User, id)
            db.session.delete(target)
            db.session.commit()
            return make_response({}, 204)
        
        except Exception as e:
            db.session.rollback()
            return make_response({"error" : str(e)}, 400)

class BusinessById(Resource):
    def get(self, id):
        try:
            target = db.session.get(Business, id)
            return make_response(target.to_dict(), 200)
        except Exception:
            return make_response({}, 404)
        
    def patch(self, id):
        try:
            if session['login_type'] != 'business':
                return make_response({"error" : "unauthorized to update profile"}, 422)
            
            new_data = request.get_json()
            selected = db.session.get(Business, id)
            for key in new_data:
                if new_data[key] == '' or new_data[key] == 0:
                    continue
                setattr(selected, key, new_data[key])
            db.session.add(selected)
            db.session.commit()
            return make_response(selected.to_dict(), 200)
        except Exception as e:
            db.session.rollback()
            return make_response({"error" : str(e)}, 400)

    def delete(self, id):
        try:
            if session['login_type'] != 'business':
                return make_response({"error" : "unauthorized to delete profile"}, 422)
            
            target = db.session.get(Business, id)
            db.session.delete(target)
            db.session.commit()
            return make_response({}, 204)
        
        except Exception as e:
            db.session.rollback()
            return make_response({"error" : str(e)}, 400)

api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Signup, '/signup')
api.add_resource(CurrentUser, '/currentuser')
api.add_resource(Listings, '/listings')
api.add_resource(ListingById, '/listingbyid/<int:id>')
api.add_resource(UserListings, '/userlistings')
api.add_resource(ULByUserId, '/ulbyuserid/<int:id>')
api.add_resource(UserListingById, '/userlistingbyid/<int:id>')
api.add_resource(UserById, '/userbyid/<int:id>')
api.add_resource(BusinessById, '/businessbyid/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

