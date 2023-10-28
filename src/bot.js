import { Telegraf, Markup} from "telegraf";
import { message } from "telegraf/filters";
import Diet from "../bin/index.js";
import {telegraf_token} from './data/token.js';

const bot = new Telegraf(telegraf_token);

bot.start((ctx) => {
  ctx.reply('Hi!!', Markup.keyboard(
      [Markup.button.text('Add dish')]
  ).resize());
  ctx.reply('Do you want to create a new menu?', Markup.inlineKeyboard(
      [Markup.button.callback('Get menu', 'menu')]
  ));
});

bot.help((ctx) => ctx.reply('Every menu is up-do-date during three days,\
 then you will be able to create a new one'))

bot.command('menu', (ctx) => {
  const diet = new Diet(ctx.from.id);
  if (diet) {
    diet.setMenu();
    const menuText = diet.getMenuText();
    ctx.reply(menuText, Markup.inlineKeyboard(
      [
        Markup.button.callback('Get grocery list', 'grocery'),
        Markup.button.callback('Show available dishes', 'dishes'),
      ]
    ));
  }
});

bot.command('grocery', (ctx) => {
  const diet = new Diet(ctx.from.id);
  diet.setGroceryList();
  const menuText = diet.getGroceryListText();
  ctx.reply(menuText);
});

bot.command('dishes', (ctx) => {
  const diet = new Diet(ctx.from.id);
  const menuText = diet.getDishesText();
  ctx.reply(menuText);
});

bot.action('menu', (ctx) => {
  const diet = new Diet(ctx.from.id);
  diet.setMenu();
  const menuText = diet.getMenuText();
  ctx.reply(menuText);
});

bot.action('grocery', (ctx) => {
  const diet = new Diet(ctx.from.id);
  diet.setGroceryList();
  const menuText = diet.getGroceryListText();
  ctx.reply(menuText);
});

bot.action('dishes', (ctx) => {
  const diet = new Diet(ctx.from.id);
  const menuText = diet.getDishesText();
  ctx.reply(menuText);
});

bot.hears('menu', (ctx) => {
  const diet = new Diet(ctx.from.id);
  const menuText = diet.getMenuText();
  ctx.reply(menuText);
});

bot.hears('grocery', (ctx) => {
  const diet = new Diet(ctx.from.id);
  diet.setGroceryList();
  const menuText = diet.getGroceryListText();
  ctx.reply(menuText);
});

// New part
const mealInfo = {};

bot.hears('Add dish', (ctx) => {
  ctx.reply('What type of meal do you want to add?');
  ctx.reply(
    'Choose a meal type:',
    Markup.inlineKeyboard([
      Markup.button.callback('Breakfast', 'breakfast'),
      Markup.button.callback('Lunch', 'lunch'),
      Markup.button.callback('Snack', 'snack'),
      Markup.button.callback('Dinner', 'dinner'),
    ])
  );
});

// Обработка ответов пользователя
bot.action('breakfast', (ctx) => {
  mealInfo.type = 'Breakfast';
  ctx.reply('You selected Breakfast.');
  ctx.reply('Please provide the name of the dish.');
});

bot.action('lunch', (ctx) => {
  mealInfo.type = 'Lunch';
  ctx.reply('You selected Lunch.');
  ctx.reply('Please provide the name of the dish.');
});

bot.action('snack', (ctx) => {
  mealInfo.type = 'Snack';
  ctx.reply('You selected Snack.');
  ctx.reply('Please provide the name of the dish.');
});

bot.action('dinner', (ctx) => {
  mealInfo.type = 'Dinner';
  ctx.reply('You selected Dinner.');
  ctx.reply('Please provide the name of the dish.');
});

// Обработка ответа с названием блюда
bot.on(message('text'), (ctx) => {
  const dishName = ctx.message.text;
  mealInfo.name = dishName;

  ctx.reply(`Please provide the ingredients for ${dishName} in the format "Ingredient 1: grams, Ingredient 2: grams".`);

});

bot.launch();
