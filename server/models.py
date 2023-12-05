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
    password = db.Column(db.String)
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
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'))

    # RELATIONSHIPS
    user = db.relationship('User', back_populates='user_listings')
    listing = db.relationship('Listing', back_populates='user_listings')

    # SERIALIZATION
    serialize_rules = ('-user.user_listings', '-listing.user_listing')

class Listing(db.Model, SerializerMixin):
    __tablename__ = 'listings'

    id = db.Column(db.Integer, primary_key=True)
    product = db.Column(db.String)
    quantity = db.Column(db.Integer)
    expiration_date = db.Column(db.DateTime)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'))
    posted_by = db.Column(db.String)
    location = db.Column(db.String)
    notes = db.Column(db.String)
    vegan_safe = db.Column(db.Boolean, server_default='false')
    non_dairy = db.Column(db.Boolean, server_default='false')
    gluten_free = db.Column(db.Boolean, server_default='false')
    nut_free = db.Column(db.Boolean, server_default='false')
    soy_free = db.Column(db.Boolean, server_default='false')
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
    type = db.Column(db.String)
    username = db.Column(db.String)
    business_name = db.Column(db.String)
    email = db.Column(db.String)
    password = db.Column(db.String)
    EIN = db.Column(db.String)
    verified = db.Column(db.Boolean, server_default='false')
    created_at = db.Column(db.DateTime, server_default=func.now())

    # RELATIONSHIPS
    listings = db.relationship('Listing', back_populates='business')

    # SERIALIZATION
    serialize_rules = ('-listings.business',)








