# Project description
## Goals

First of all this project was created for educational purposes, so I will not use a lot of third-party libraries (like lodash).

The main goal of this project is to create a special bot that can provide an international menu,
that can be cooked with a small amount of time (less than an hour per day).
Also, this diet should be healthy, including all recommended nutrients and tasty of course :)

Some restrictions for this project:
* The dishes should be able to be stored in fridge (or particularly in a freezer)
* Options for a mono diet, or usually one dish for three days (not in a row, but per week)
* Low cooking or zero cooking recipes
* Ru and Eng version, of course :)

## Structure

### 1. Data Module

Placed in folder `data-module/`

* MongoDB Database: Contains collections for users, recipes, products and other related data.
* Mongoose: Used to define data schemas, perform validation, and manage interactions with the MongoDB database.

### 2. Data Access Module

Placed with data-module in folder `data-module/`

* Express.js API: Implements endpoints for interacting with the database. Includes methods for reading, writing, updating, and deleting data.
* Middleware for Authentication and Authorization: Ensures API security by controlling access to specific endpoints.

### 3.Application Logic Module

Placed in folder `bin/`

* Menu Generation Service: Responsible for generating menus based on user preferences and available cooking time.
* Settings Management Service: Handles user settings, such as dish types (vegetarian, meat-based, etc.) and cooking duration.
* Settings Saving Service: Allows users to save their settings for future use.

### 4. User Interface

Placed in folder `bot/`

* Telegram Bot: Processes user requests via the Telegram API
* Web Application: Allows users to manage their recipes through a web interface, including adding and deleting recipes.

## Roadmap

### Version 0.2 – Basic functionality (Pre-release)

#### Features:
1. Provide a 3-days menu from preloaded set to database
2. A plain grocery list without grouping in sections
3. Recipes only for multi cooker
4. English version
5. One user only

#### Programming tasks:
* Create a data module with preloaded menu
* Create a part of data access module with ability to provide a data
* Telegram bot that fetch a data and display it in a bot
* Third-party API (spoonacular) connector

### Version 0.1 – DI Bootcamp Hackathon version (Pre-release)
