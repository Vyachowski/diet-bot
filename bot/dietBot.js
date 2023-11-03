import TelegramBot from 'node-telegram-bot-api';
import Diet from "../bin/index.js";

const diet = new Diet();
const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  bot.sendMessage(chatId, `Привет, пользователь! Твой ID: ${userId}. ID чата: ${chatId}`).then(() => true);
});

bot.onText(/\/menu/, async (msg) => {
  const currentMenu = await diet.getCurrentMenu();
  const currentMenuText = JSON.stringify(currentMenu.breakfast);

  bot.sendMessage(msg.chat.id, `${currentMenuText}`).then(() => true);
});
