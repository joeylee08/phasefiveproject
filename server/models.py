from sqlalchemy import func
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt
import re

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    login_type = db.Column(db.Integer, server_default='user')
    email = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    location = db.Column(db.String, server_default='')
    created_at = db.Column(db.DateTime, server_default=func.now())

    # RELATIONSHIPS
    user_listings = db.relationship('UserListing', back_populates='user', cascade='all, delete-orphan')

    # ASSOCIATION PROXY
    listings = association_proxy('user_listings', 'listing')

    # SERIALIZATION
    serialize_rules = ('-user_listings.user', '-listings.users')

    # PASSWORD HASHING
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        self._password_hash = password_hash

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)
    
    # must be 'user' or 'business'
    @validates('login_type')
    def validate_login(self, _, value):
        if value != 'user':
            raise Exception('Login type must be user.')
        return value
    
    # must include @
    @validates('email')
    def validate_email(self, _, value):
        if not isinstance(value, str) or len(value) < 1:
            raise Exception('Email must be a string')
        elif not value.find('@'):
            raise Exception('Please provide a valid email.')
        return value

    # must exist and be a string
    @validates('username')
    def validate_username(self, _, value):
        if not isinstance(value, str) or len(value) < 1:
            raise Exception('Username must be a string')
        return value

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
    serialize_only = ('id', 'user_id', 'listing_id')

    # must be a valid user in our db
    @validates('user_id')
    def validate_user_id(self, _, value):
        if not User.query.filter_by(id=value):
            raise Exception('That user does not exist.')
        return value
    
    # must be a valid listing in our db
    @validates('listing_id')
    def validate_listing_id(self, _, value):
        if not Listing.query.filter_by(id=value):
            raise Exception('That listing does not exist.')
        return value

class Listing(db.Model, SerializerMixin):
    __tablename__ = 'listings'

    id = db.Column(db.Integer, primary_key=True)
    product = db.Column(db.String, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    expiration_date = db.Column(db.String, nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id')) 
    posted_by = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
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

    # must exist and be a string
    @validates('product')
    def validate_product(self, _, value):
        if not isinstance(value, str) or len(value) < 1:
            raise Exception('Product must be a string')
        return value

    # must exist and be an integer greater than 0
    @validates('quantity')
    def validate_quantity(self, _, value):
        if not isinstance(value, int):
            raise Exception('Quantity must be an integer')
        elif value < 1:
            raise Exception('Quantity must be at least 1.')
        return value

    # must exist and be in date formant mm/dd/yy
    @validates('expiration_date')
    def validate_expiration_date(self, _, value):
        date_format = re.compile(r'\b\d{2}/\d{2}/\d{2}\b')

        if not isinstance(value, str) or len(value) < 1:
            raise Exception('Expiration date must be a string')
        elif not date_format.match(value):
            raise Exception('Please use format mm/dd/yy.')
        return value
    
    # creator business must exist
    @validates('business_id')
    def validate_business_id(self, _, value):
        if not Business.query.filter_by(id=value):
            raise Exception('That business does not exist.')
        return value

    # must exist and be a string
    @validates('location')
    def validate_location(self, _, value):
        if not isinstance(value, str) or len(value) < 1:
            raise Exception('Location must be a string')
        return value

class Business(db.Model, SerializerMixin):
    __tablename__ = 'businesses'

    id = db.Column(db.Integer, primary_key=True)
    login_type = db.Column(db.Integer, server_default='business')
    username = db.Column(db.String, nullable=False)
    business_name = db.Column(db.String)
    email = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    location = db.Column(db.String, server_default='')
    created_at = db.Column(db.DateTime, server_default=func.now())

    # RELATIONSHIPS
    listings = db.relationship('Listing', back_populates='business', cascade='all, delete-orphan')

    # SERIALIZATION
    serialize_rules = ('-listings.business',)

    # PASSWORD HASHING
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        self._password_hash = password_hash

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)
    
    # must be 'user' or 'business'
    @validates('login_type')
    def validate_login(self, _, value):
        if value != 'business':
            raise Exception('Login type must be business.')
        return value
    
    # must exist and be a string
    @validates('username')
    def validate_username(self, _, value):
        if not isinstance(value, str) or len(value) < 1:
            raise Exception('Username must be a string')
        return value
    
    # must exist and be a string
    @validates('business_name')
    def validate_business_name(self, _, value):
        if not isinstance(value, str) or len(value) < 1:
            raise Exception('Username must be a string')
        return value
    
    # must include @
    @validates('email')
    def validate_email(self, _, value):
        if not isinstance(value, str) or len(value) < 1:
            raise Exception('Email must be a string')
        elif not value.find('@'):
            raise Exception('Please provide a valid email.')
        return value
