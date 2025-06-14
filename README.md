# Book-Trading App
The aim of this application to allow users to manage their books and trade book with other user.

# What it Does
It allows user to create an account and login. Once the user is loged in they will be able to view all the books that are added by the users. This allow users to trade books with others. When one gets a trade reques they can decline or accept the trade request for the book.

## New Features

* Users can now add other users as friends and manage a friends list.
* Books can be searched by the owner's city or state using the `/api/books/nearby` endpoint.
* Trade requests support a `tradeMethod` of either `mail` or `in_person`.


# User stories 

* User Story: As authenticated user I can view all books posted by every user.
* User Story: As authenticated user I can add a new book.
* User Story: As authenticated user I can propose a trade and wait for the other user to accept the trade.
* User Story: As authenticated user I can cancel my trade request.
* User Story: As unauthenticated user I can create an account in the application


# What Still to come

1. Apdating the user location setting
2. Adding a google book API to work with the application so that I could render the book easily
3. Better error handeling

# Tools Used


* MEAN stack:
    * Node.js
    * Express
    * MongoDB/Mongoose
    * AngularJs
