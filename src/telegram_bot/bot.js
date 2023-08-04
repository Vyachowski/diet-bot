import { Telegraf, Markup } from "telegraf";
import Diet from "../../bin/index.js";
import telegraf_token from '../data/token.js';

const bot = new Telegraf(telegraf_token);
const diet = new Diet();

bot.start((ctx) => {
  console.log('started:', ctx.from.id)
  return ctx.reply('Hi! Do you want to create a new menu?', Markup.inlineKeyboard([Markup.button.callback('Get menu', 'get_menu')]));
});

bot.command('get_menu', (ctx) => {
  diet.setMenu();
  const menuText = diet.displayMenu();
  ctx.reply(menuText);
});

bot.command('get_menu', (ctx) => {
  diet.setMenu();
  const menuText = diet.displayMenu();
  ctx.reply(menuText);
});

bot.action('get_menu', (ctx) => {
  diet.setMenu();
  const menuText = diet.displayMenu();
  ctx.reply(menuText);
});

bot.launch();
