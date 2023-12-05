#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, UserListing, Listing, Business
from datetime import date, timedelta

def create_users():
    users = []
    u1 = User(
        username='johnsmith12',
        email='js12@fis.com',
        password='password'
    )
    u2 = User(
        username='brendasong88',
        email='bs88@fis.com',
        password='password'
    )
    u3 = User(
        username='floydrose54',
        email='fr54@fis.com',
        password='password'
    )
    users.append(u1)
    users.append(u2)
    users.append(u3)
    db.session.add_all(users)
    db.session.commit()

def create_businesses():
    businesses = []
    b1 = Business(
        type='bakery',
        username='mjspies',
        business_name='Mary Jane\'s Pies',
        email='mjspies12@fis.com',
        password='password'
    )
    b2 = Business(
        type='restaurant',
        username='arpdenver',
        business_name='Alfredo Rosales Pizzeria',
        email='arpd@fis.com',
        password='password'
    )
    b3 = Business(
        type='grocery',
        username='swportland',
        business_name='Safeway Portland',
        email='swp12@fis.com',
        password='password'
    )
    businesses.append(b1)
    businesses.append(b2)
    businesses.append(b3)
    db.session.add_all(businesses)
    db.session.commit()

def create_listings():
    formatted_date = date.today().strftime("%m/%d/%y")
    listings = []
    l1 = Listing(
        product='Chef Boyardee Canned Ravioli',
        quantity=25,
        expiration_date=formatted_date,
        business_id = 3,
        posted_by='Safeway Portland',
        location='5234 State Hwy, Portland OR',
        notes='Please pickup between 3 and 6 PM.'
    )
    l2 = Listing(
        product='Large Pepperoni Pizzas, Frozen',
        quantity=12,
        expiration_date=formatted_date,
        business_id = 2,
        posted_by='Alfredo Rosales Pizzeria',
        location='12 Mountain Way, Denver CO',
        notes='Please pickup after 8PM.'
    )
    l3 = Listing(
        product='Assorted Family Size Pies',
        quantity=8,
        expiration_date=formatted_date,
        business_id = 1,
        posted_by='Mary Jane\'s Pies',
        location='1223 Beach Blvd, Santa Ana CA',
        notes='Please pickup between 5 and 8 PM.'
    )
    listings.append(l1)
    listings.append(l2)
    listings.append(l3)
    db.session.add_all(listings)
    db.session.commit()
    
def create_user_listings():
    user_listings = []

    ul1 = UserListing(
        user_id=1,
        listing_id=1
    )
    ul2 = UserListing(
        user_id=1,
        listing_id=2
    )
    ul3 = UserListing(
        user_id=2,
        listing_id=1
    )
    ul4 = UserListing(
        user_id=2,
        listing_id=2
    )
    ul5 = UserListing(
        user_id=3,
        listing_id=3
    )
    ul6 = UserListing(
        user_id=3,
        listing_id=2
    )

    user_listings.append(ul1)
    user_listings.append(ul2)
    user_listings.append(ul3)
    user_listings.append(ul4)
    user_listings.append(ul5)
    user_listings.append(ul6)
    db.session.add_all(user_listings)
    db.session.commit()

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        create_users()
        create_listings()
        create_businesses()
        create_user_listings()
