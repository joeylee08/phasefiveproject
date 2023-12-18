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
    )
    u1.password_hash = 'password'
    u2 = User(
        username='brendasong88',
        email='bs88@fis.com'
    )
    u2.password_hash = 'password'
    u3 = User(
        username='floydrose54',
        email='fr54@fis.com'
    )
    u3.password_hash = 'password'
    u4 = User(
        username='matteo_the_goat',
        email='matteo12@fis.com'
    )
    u4.password_hash = 'password'
    u5 = User(
        username='joeylee08',
        email='joeylee08@fis.com'
    )
    u5.password_hash = 'password'

    users.append(u1)
    users.append(u2)
    users.append(u3)
    users.append(u4)
    users.append(u5)
    db.session.add_all(users)
    db.session.commit()

def create_businesses():
    businesses = []
    b1 = Business(
        username='swpdx',
        business_name='Sureway PDX',
        email='swpdx12@fis.com',
        location='1030 SW Jefferson St, Portland OR'
    )
    b1.password_hash = 'password'
    b2 = Business(
        username='sandispdx',
        business_name='Sandi\'s Cafe and Pies',
        email='arpd@fis.com',
        location='7451 SW Garden Home Rd, Portland OR'
    )
    b2.password_hash = 'password'
    b3 = Business(
        username='rickypizza',
        business_name='Ricardo Pizzeria',
        email='ricky12@fis.com',
        location='3905 SW Orbit St Suite 110, Beaverton OR'
    )
    b3.password_hash = 'password'

    businesses.append(b1)
    businesses.append(b2)
    businesses.append(b3)
    db.session.add_all(businesses)
    db.session.commit()

def create_listings():
    listings = []
    l1 = Listing(
        product='22oz Ragu Pasta Sauce',
        quantity=25,
        expiration_date='2/12/24',
        business_id = 1,
        posted_by='Sureway PDX',
        location='1030 SW Jefferson St, Portland OR',
        notes='Please pickup between 3 and 6 PM. Ask for manager Luis.'
    )
    l2 = Listing(
        product='Nature\'s Best Trail Mix Bars',
        quantity=200,
        expiration_date='2/12/24',
        business_id = 1,
        posted_by='Sureway PDX',
        location='1030 SW Jefferson St, Portland OR',
        notes='Please pickup between 3 and 6 PM. Ask for manager Luis.'
    )
    l3 = Listing(
        product='Rainman\'s Best Fishsticks Frozen 24oz',
        quantity=12,
        expiration_date='2/12/24',
        business_id = 1,
        posted_by='Sureway PDX',
        location='1030 SW Jefferson St, Portland OR',
        notes='Please pickup between 3 and 6 PM. Ask for manager Angela.'
    )
    l4 = Listing(
        product='Large Pepperoni Pizzas, Frozen',
        quantity=12,
        expiration_date='2/12/24',
        business_id = 1,
        posted_by='Sureway PDX',
        location='1030 SW Jefferson St, Portland OR',
        notes='Please pickup between 3 and 6 PM. Ask for manager Victoria.'
    )
    l5 = Listing(
        product='Ensure 20g Protien Formula 12 Pack',
        quantity=8,
        expiration_date='2/12/24',
        business_id = 1,
        posted_by='Sureway PDX',
        location='1030 SW Jefferson St, Portland OR',
        notes='Please pickup between 3 and 6 PM. Ask for manager Victoria.'
    )
    l6 = Listing(
        product='Assorted Pies, 14"',
        quantity=8,
        expiration_date='2/12/24',
        business_id = 2,
        posted_by='Sandi\'s Cafe and Pies',
        location='7451 SW Garden Home Rd, Portland OR',
        notes='Please pickup between 5 and 8 PM. Ask for manager Miguel.'
    )
    l7 = Listing(
        product='Dinner Rolls, 5oz',
        quantity=75,
        expiration_date='2/12/24',
        business_id = 2,
        posted_by='Sandi\'s Cafe and Pies',
        location='7451 SW Garden Home Rd, Portland OR',
        notes='Please pickup between 5 and 8 PM. Ask for manager Miguel.'
    )
    l8 = Listing(
        product='Frozen Vegetables, Mixed 16oz bags',
        quantity=8,
        expiration_date='2/12/24',
        business_id = 2,
        posted_by='Sandi\'s Cafe and Pies',
        location='7451 SW Garden Home Rd, Portland OR',
        notes='Please pickup between 5 and 8 PM. Ask for manager Miguel.'
    )
    l9 = Listing(
        product='Frozen Hamburger Patties 1/4 Pound',
        quantity=16,
        expiration_date='2/12/24',
        business_id = 2,
        posted_by='Sandi\'s Cafe and Pies',
        location='7451 SW Garden Home Rd, Portland OR',
        notes='Please pickup between 5 and 8 PM. Ask for manager Miguel.'
    )
    l10 = Listing(
        product='Mozzarella Cheese, 24oz bags',
        quantity=5,
        expiration_date='2/12/24',
        business_id = 3,
        posted_by='Ricardo Pizzeria',
        location='3905 SW Orbit St Suite 110, Beaverton OR',
        notes='Please pickup between 5 and 8 PM. Ask for manager Andrew.'
    )
    l11 = Listing(
        product='Pizza Dough, 16oz Portions',
        quantity=20,
        expiration_date='2/12/24',
        business_id = 3,
        posted_by='Ricardo Pizzeria',
        location='3905 SW Orbit St Suite 110, Beaverton OR',
        notes='Please pickup between 5 and 8 PM. Ask for manager Andrew.'
    )
    l12 = Listing(
        product='Various Fresh Vegetables',
        quantity=10,
        expiration_date='2/12/24',
        business_id = 3,
        posted_by='Ricardo Pizzeria',
        location='3905 SW Orbit St Suite 110, Beaverton OR',
        notes='Please pickup between 5 and 8 PM. Ask for manager Andrew.'
    )

    listings.append(l1)
    listings.append(l2)
    listings.append(l3)
    listings.append(l4)
    listings.append(l5)
    listings.append(l6)
    listings.append(l7)
    listings.append(l8)
    listings.append(l9)
    listings.append(l10)
    listings.append(l11)
    listings.append(l12)
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
        listing_id=3
    )
    ul4 = UserListing(
        user_id=2,
        listing_id=4
    )
    ul5 = UserListing(
        user_id=3,
        listing_id=5
    )
    ul6 = UserListing(
        user_id=3,
        listing_id=1
    )
    ul7 = UserListing(
        user_id=4,
        listing_id=2
    )
    ul8 = UserListing(
        user_id=4,
        listing_id=2
    )
    ul9 = UserListing(
        user_id=5,
        listing_id=3
    )
    ul10 = UserListing(
        user_id=5,
        listing_id=4
    )

    user_listings.append(ul1)
    user_listings.append(ul2)
    user_listings.append(ul3)
    user_listings.append(ul4)
    user_listings.append(ul5)
    user_listings.append(ul6)
    user_listings.append(ul7)
    user_listings.append(ul8)
    user_listings.append(ul9)
    user_listings.append(ul10)
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
