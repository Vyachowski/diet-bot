#!/usr/bin/env node --env-file=.env
import { Bot } from "grammy";

const bot = new Bot(process.env.BOT_TOKEN);


bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  bot.sendMessage(chatId, `ID: ${userId}. Chat ID: ${chatId}\n\n${welcomeMessage}`) .then(() => true);
});

bot.onText(/\/menu/, async (msg) => {
  const currentMenu = await diet.getMenu();
  const currentMenuText = JSON.stringify(currentMenu.breakfast);

  bot.sendMessage(msg.chat.id, `${currentMenuText}`).then(() => true);
});

bot.onText(/\/grocery/, async (msg) => {

  bot.sendMessage(msg.chat.id, `${'text'}`).then(() => true);
});

bot.onText(/\/dishes/, async (msg) => {

  bot.sendMessage(msg.chat.id, `${'text'}`).then(() => true);
});
