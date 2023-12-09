import TelegramBot from 'node-telegram-bot-api';
import Diet from "../bin/index.js";

const diet = new Diet();
const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});
const welcomeMessage =
  'Hi! Let me introduce you Bity Smarty – ' +
  'a special bot that can provide a healthy diet and a grocery list for your next shopping.\n\n' +
  'Here is 5 main features of this bot:\n' +
  '1. Save your time: Only 1 hour for cooking per day!\n' +
  '2. No complex equipment. Just a multi cooker to start!\n' +
  '3. Healthy diet with fancy recipes that looks great\n' +
  '4. Most recipes can be easily stored in the fridge or in the freezer\n' +
  '5. I can make it even tastier – It is completely free :)'

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
