# Book Finder
This web application is a book search application that leverages the Google Books API to allow users to search for and save books to their account. Initially built with a RESTful API using MERN stack (MongoDB, Express, React, Node.js), the backend was refactored to use a GraphQL API with an Apollo Server. 

Checkout the deployed Book Finder site on Render [here](https://drive.google.com/file/d/1ESDDfXLsK2JAUPmgxF-wUNlc4Bl-I7HQ/view) and demo the application.

## Table of Contents
* [Features](#features)
* [Installation](#installation)
* [Testing](#testing)
* [License](#license)
* [Contributing](#contributing)
* [Contact Information](#contact-information)

## Features
- **Book Search:** Users can search for books using the Google Books API.
- **Save Book Searches:** Users can save their favorite books to their account.
- **Authentication:** User authentication allows for personalized saved book data.
- **GraphQL API:** The backend has been refactored to use GraphQL with Apollo Server to handle book queries and mutations.
- **MongoDB Database:** MongoDB Atlas is used for the database to store user data and saved books.

### Application Authentication
![Screenshot of the Deployed Application](/Develop/client/public/Authentication.png)
### Search For Books
![Screenshot of the Deployed Application](/Develop/client/public/SearchForBooks.png)
### Saved Books
![Screenshot of the Deployed Application](/Develop/client/public/SavedBooks.png)

## Installation
1. Fork the repo to your local machine
2. Install the necessary dependencies using: 
   ```
   npm install
   ```
3. Set up MongoDB by creating a MongoDB Atlas account and setting up a MongoDB cluster.
4. Create a .env file and update the MongoDB URI to your MongoDB Atlas database. 
    * Following the template of the .env.EXAMPLE file
5. Test the application locally by running:
    ```
    npm run dev
    ```

## License
This project is licensed under the ISC License.

## Contributing
Contributions welcome for this project! Feel free to fork the repository, make your changes, and submit a pull request.

## Contact
* GitHub: celeste-hayes