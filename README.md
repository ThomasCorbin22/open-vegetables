# Terrarie

This is a vegetarian / vegan food platform that allows Hong Kongers to explore these hidden gem restaurants within Hong Kong. A blog element keeps everyone informated about the latest developments.

## How to install

To install this application on a remote computer, first clone the repository to a local machine from Github.

The application requires a PostgreSQL database set up as part of the backend requirements. The necessary migration and seed files are found within their respective folders in this application and are run using the Knex module. The commands for the CLI are: 'knex migrate:latest'; 'knex seed:run'

A .env file will also need to be added in the root directory and include the following information. Note that the variable names must be identical.

1. DATABASE_NAME - Name of PostgreSQL database
2. DATABASE_USERNAME - Username of PostgreSQL database
3. DATABASE_PASSWORD - Password for specified username
4. FACEBOOK_ID - For Facebook login, please set up from Facebook Developers
5. FACEBOOK_SECRET
6. GOOGLE_ID - For Google login, please set up Google OAuth
7. GOOGLE_SECRET

### Running the application

Ensure that all modules have been installed locally with 'npm install'. Then the application can simply be run by using 'node app'.

The application consists of four major parts: Restaurants, Blogs, Maps, Users.

The restaurants section allows users to search for a variety of different restaurants using various filters (such as alphabetical / rating / location). Once a suitable restaurant has been clicked on, there is a page that provides more indepth information about the restaurant and allows for user reviews.

The blog section allows users to read the latest news about vegetarianism and sustainability in Hong Kong. Users can comment on the blogs to generate discussion and can like other user's comments.

The map section provides an overview of the restaurant locations within Hong Kong. USers can zoom into different districts by using the relevant drop down menus. The restaurant pins will link back to the restaurant relevant page.

The users section allows updating of user information, such as profile picture or security questions. Users can also see a list of their favourited restaurants and blogs. Users with blog / restaurant access can also post and update their restaurants and blogs.

## Authors

* **Thomas Corbin** - [ThomasCorbin22]
* **Edwin Chan** - [edwin9876]
* **Alex Wong** - [alxwong1991]