# Project description

## Goals

First of all this project was created for educational purposes, so I will not use a lot of third-party libraries (like lodash).

The main goal of this project is to create a special bot that can provide an international menu, that can be cooked with a small amount of time (less than an hour per day).

## Structure

### 1. Data Module

* MongoDB Database: Contains collections for users, recipes, products and other related data.
* Mongoose: Used to define data schemas, perform validation, and manage interactions with the MongoDB database.

### 2. Data Access Module

* Express.js API: Implements endpoints for interacting with the database. Includes methods for reading, writing, updating, and deleting data.
* Middleware for Authentication and Authorization: Ensures API security by controlling access to specific endpoints.

### 3.Application Logic Module:

* Menu Generation Service: Responsible for generating menus based on user preferences and available cooking time.
* Settings Management Service: Handles user settings, such as dish types (vegetarian, meat-based, etc.) and cooking duration.
* Settings Saving Service: Allows users to save their settings for future use.

### 4. User Interface

* Telegram Bot: Processes user requests via the Telegram API
* Web Application: Allows users to manage their recipes through a web interface, including adding and deleting recipes.

## Roadmap

### Version 0.2 – Basic functionality

Features:
1. Provide a week menu from preloaded set to database
2. Provide a grocery list

Programming tasks:
* Create a data module with preloaded menu
* Create a part of data access module with ability to provide a data
* Telegram bot that fetch a data and display it in a bot
