import { Telegraf, Markup } from "telegraf";
import Diet from "../bin/index.js";
import {telegraf_token} from './data/token.js';

const bot = new Telegraf(telegraf_token);

bot.start((ctx) => {
  return ctx.reply('Hi! Do you want to create a new menu?', Markup.inlineKeyboard(
      [Markup.button.callback('Get menu', 'menu')]
  ));
});

bot.help((ctx) => ctx.reply('Every menu is up-do-date during three days,\
 then you will be able to create a new one'))

bot.command('menu', (ctx) => {
  const diet = new Diet(ctx.from.id);
  if (diet) {
    diet.setMenu();
    const menuText = diet.getMenu();
    ctx.reply(menuText);
  }
});

bot.command('grocery', (ctx) => {
  const diet = new Diet(ctx.from.id);
  diet.setGroceryList();
  const menuText = diet.getGroceryList();
  ctx.reply(menuText);
});

bot.command('dishes', (ctx) => {
  const diet = new Diet(ctx.from.id);
  const menuText = diet.getDishes();
  ctx.reply(menuText);
});

bot.action('menu', (ctx) => {
  const diet = new Diet(ctx.from.id);
  diet.setMenu();
  const menuText = diet.getMenu();
  ctx.reply(menuText);
});

bot.action('grocery', (ctx) => {
  const diet = new Diet(ctx.from.id);
  diet.setGroceryList();
  const menuText = diet.getGroceryList();
  ctx.reply(menuText);
});

bot.action('dishes', (ctx) => {
  const diet = new Diet(ctx.from.id);
  const menuText = diet.getDishes();
  ctx.reply(menuText);
});

bot.launch();
