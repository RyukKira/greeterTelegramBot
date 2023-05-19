require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.YOUR_API_TOKEN, { polling: true });

bot.on("message", msg => {
  if (msg.text === "/start") {
    bot.sendMessage(
      msg.chat.id,
      "Welcome to this bot! I help you to manage your large groups and greet anyone who joined your group and delete <b>someone joined the group</b> message to keep your group neat!",
      { parse_mode: "HTML" },
    );
  } else {
    bot.sendMessage(
      msg.chat.id,
      `For now I can only respond to <b>/start</b> in this chat. If you want me to have more features please contact my founder here t.me/${msg.chat.username}`,
      { parse_mode: "HTML" },
    );
  }
});

bot.on("new_chat_members", msg => {
  const chatId = msg.chat.id;
  const first_name = msg.new_chat_members[0].first_name;
  const message = `Welcome to the group, ${first_name}!`;

  const msgId = msg.message_id;
  bot
    .deleteMessage(chatId, msgId)
    .catch(err => console.error("Error deleting message: ", err));
  bot.sendMessage(chatId, message);
});

bot.on("left_chat_member", msg => {
  const chatId = msg.chat.id;
  const messageId = msg.message_id;
  bot.deleteMessage(chatId, messageId);
});
