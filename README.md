# Manna Foods Web App

![](mannafoods.gif)

## Project Description

This SPA [single page application] is a React / Flask app that allows businesses, namely restaurants and grocers, to post listings of surplus food for users to come pick up at no cost. Individuals can create an account as either a user or business. Users can browse and save listings, while businesses can create and edit listings. Listings are location-based and can be filtered for specific keywords and preset dietary restrictions.

## Installation

1. Fork and clone this Github repository to your local environment.
2. Open the file in your local code editor.
3. CD into the main directory: phasefiveproject.
4. CD into the /server directory and run the command `$ pipenv install ; pipenv shell` to install server dependencies.
5. Run the command `$ export FLASK_RUN_PORT=5555` to ensure the server is running on the appropriate port.
6. Verify that you are in the /server directory and run the command `$ flask run` to start your Flask server.
7. CD into the main directory.
8. CD into the /client directory and run the command `$ npm install` to install client dependencies.
9. Verify that you are in the /client directory and run the command `$ npm start` to start your React server.
10. The page should now be running at localhost:5555.

## Usage: User

1. Create a free account by using the signup form.
2. Go to your Account tab and set your location to see nearby listings.
3. Browse listings and save them to your My Listings page.
4. Remove unwanted listings from your saved collection.
5. You can modify your user information or delete your account under the Account page.

## Usage: Business

1. Create a free account by using the signup form.
2. Go to your Account tab and set a default pickup location for your listings.
3. Use your Create Listing page to post listings for your community.
4. Be sure to include additional notes such as pickup times anc contact information.
5. As items are picked up, remember to update the quantities accordingly.
6. You can click on any listing card in Active Listings and edit its details.
7. Do not post expired items, and please be honest about expiration dates.
8. Once an item has been picked up, don't forget to delete the original listing.
9. You can modify your user information or delete your account under the Account page.


## Notes on Environment Variables

1. The Maps API key has not been uploaded to the GitHub repo.
2. The Flask SECRET_KEY has not been uploaded to the GitHub repo.
3. The app will not run properly without these two keys provided.

## Credits

Code written, tested, and submitted by Joseph L.

Github: https://github.com/joeylee08