from sqlalchemy import func
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt
from datetime import datetime, timedelta

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, required=True)
    email = db.Column(db.String, required=True)
    password = db.Column(db.String, required=True)
    created_at = db.Column(db.DateTime, server_default=func.now())

    # RELATIONSHIPS
    user_listings = db.relationship('UserListing', back_populates='user')

    # ASSOCIATION PROXY
    listings = association_proxy('user_listings', 'listing')

    # SERIALIZATION
    serialize_rules = ('-user_listings.user', '-listings.users')

class UserListing(db.Model, SerializerMixin):
    __tablename__ = 'userlistings'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), required=True)
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'), required=True)

    # RELATIONSHIPS
    user = db.relationship('User', back_populates='user_listings')
    listing = db.relationship('Listing', back_populates='user_listings')

    # SERIALIZATION
    serialize_rules = ('-user.user_listings', '-listing.user_listing')

class Listing(db.Model, SerializerMixin):
    __tablename__ = 'listings'

    id = db.Column(db.Integer, primary_key=True)
    product = db.Column(db.String, required=True)
    quantity = db.Column(db.Integer, required=True)
    expiration_date = db.Column(db.Datetime, required=True)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), required=True)
    posted_by = db.Column(db.String, required=True)
    location = db.Column(db.String, required=True)
    notes = db.Column(db.String)
    vegan_safe = db.Column(db.Boolean, server_default='true')
    non_dairy = db.Column(db.Boolean, server_default='true')
    gluten_free = db.Column(db.Boolean, server_default='true')
    nut_free = db.Column(db.Boolean, server_default='true')
    soy_free = db.Column(db.Boolean, server_default='true')
    created_at = db.Column(db.DateTime, server_default=func.now())

    # RELATIONSHIPS
    user_listings = db.relationship('UserListing', back_populates='listing')
    business = db.relationship('Business', back_populates='listings')

    # ASSOCIATION PROXY
    users = association_proxy('user_listings', 'user')

    # SERIALIZATION
    serialize_rules = ('-user_listings.listing', '-business.listings', '-users.listings')

class Business(db.Model, SerializerMixin):
    __tablename__ = 'businesses'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, required=True, )
    username = db.Column(db.String, required=True, )
    business_name = db.Column(db.String, required=True)
    email = db.Column(db.String, required=True, )
    password = db.Column(db.String, required=True, )
    EIN = db.Column(db.String)
    verified = db.Column(db.Boolean, server_default='false')
    created_at = db.Column(db.DateTime, server_default=func.now())

    # RELATIONSHIPS
    listings = db.relationship('Listing', back_populates='business')

    # SERIALIZATION
    serialize_rules = ('-listings.business',)