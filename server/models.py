from sqlalchemy import func
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt
from datetime import datetime

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=func.now())

    # RELATIONSHIPS
    user_listings = db.relationship('UserListing', back_populates='user')

    # ASSOCIATION PROXY
    listings = association_proxy('user_listings', 'user')

class UserListing(db.Model, SerializerMixin):
    __tablename__ = 'userlistings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    listing_id = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=func.now())

    # RELATIONSHIPS
    user = db.relationship('User', back_populates='user_listings')
    listing = db.relationship('Listing', back_populates='user_listings')

class Listing(db.Model, SerializerMixin):
    __tablename__ = 'listings'

    id = db.Column(db.Integer, primary_key=True)
    product = db.Column(db.String)
    quantity = db.Column(db.Integer)
    expiration_date = db.Column(db.DateTime)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'))
    posted_by = db.Column(db.String, db.ForeignKey('businesses.business_name'))
    location = db.Column(db.String)
    notes = db.Column(db.String)
    vegan_safe = db.Column(db.Boolean, server_default=False)
    non_dairy = db.Column(db.Boolean, server_default=False)
    gluten_free = db.Column(db.Boolean, server_default=False)
    nut_free = db.Column(db.Boolean, server_default=False)
    soy_free = db.Column(db.Boolean, server_default=False)
    created_at = db.Column(db.DateTime, server_default=func.now())

    # RELATIONSHIPS
    user_listings = db.relationship('UserListing', back_populates='listing')
    business = db.relationship('Business', back_populates='listings')

    # ASSOCIATION PROXY
    users = association_proxy('user_listings', 'listing')

class Business(db.Model, SerializerMixin):
    __tablename__ = 'businesses'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)
    username = db.Column(db.String)
    business_name = db.Column(db.String)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String)
    EIN = db.Column(db.String)
    verified = db.Column(db.Boolean, server_default=False)
    created_at = db.Column(db.DateTime, server_default=func.now())

    # RELATIONSHIPS
    listings = db.relationship('Listing', back_populates='business_id')








