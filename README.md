### Code and linter status
[![Maintainability](https://api.codeclimate.com/v1/badges/486fccb0b96e9919931a/maintainability)](https://codeclimate.com/github/Vyachowski/simple-diet-bot/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/486fccb0b96e9919931a/test_coverage)](https://codeclimate.com/github/Vyachowski/simple-diet-bot/test_coverage)

# Bity Smarty – Healthy diet bot

Easy-to-use helper for maintain a healthy diet.

## Goals

First of all this project was created for educational purposes, so I will not use a lot of third-party libraries (like lodash).

The main goal of this project is to create a special bot that can provide an international menu,
that can be cooked with a small amount of time (less than an hour per day).
Also, this diet should be healthy, including all recommended nutrients and tasty of course :)

Some restrictions for this project:
* The dishes should be able to be stored in fridge (or particularly in a freezer)
* Just a one-hour enjoyable cooking for three days of healthy diet
* Low cooking or zero cooking recipes
* Ru and Eng version, of course :)

## Description

Telegram bot with favourite meals, that can provide a weekly grocery list and menu for a week.

- [x] Your own menu with favorite meals
- [ ] Get a grocery list for easy shopping
- [ ] Maintain calorie intake

## Getting Started

Now only available from a Node.js...

### Dependencies

JS version:
* Node.js

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


### Executing program

Telegram bot will be available soon...

## Authors

Feel free to contact me and help with the project

Slava Haikin
[@vyachowski](https://twitter.com/vyachowski)

## Version History

* 0.2
    * Basic Menu with one variant for every meal
    * Telegram bot with ability to provide a grocery list and menu
    * Not a production release
* 0.1
    * A hackathon version
    * On-demand grocery list
    * On-demand menu for a week
    * JSON files with a data
    * Not a production release

## License

This project is licensed under the MIT License - just because it sounds great :)
