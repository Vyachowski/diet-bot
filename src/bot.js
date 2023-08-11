import { Telegraf, Markup } from "telegraf";
import Diet from "../../bin/index.js";
import {telegraf_token} from '../data/token.js';

const bot = new Telegraf(telegraf_token);
const diet = new Diet();

bot.start((ctx) => {
  console.log('started:', ctx.from.id)
  return ctx.reply('Hi! Do you want to create a new menu?', Markup.inlineKeyboard(
      [Markup.button.callback('Get menu', 'menu')]
  ));
});

bot.command('menu', async (ctx) => {
  await diet.setMenu()
  const menuText = diet.getMenu();
  ctx.reply(menuText);
});

bot.command('grocery_list', async (ctx) => {
  await diet.setMenu();
  const menuText = diet.getGroceryList();
  ctx.reply(menuText);
});

bot.action('menu', async (ctx) => {
  await diet.setMenu();
  const menuText = diet.getMenu();
  ctx.reply(menuText);
});

bot.action('grocery_list', async (ctx) => {
  await diet.setMenu();
  const menuText = diet.getGroceryList();
  ctx.reply(menuText);
});

bot.launch();
