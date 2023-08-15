const TelegramBot = require("node-telegram-bot-api");
const {Configuration,OpenAIApi} = require('openai');
const botToken ='Key for telgram not shown for security reason';
const openaiToken='Key for openai not shown for security reason';
const config = new Configuration({
    apikey : openaiToken,
});

const bot = new TelegramBot(botToken,{polling :true});
const openai = new OpenAIApi(config);
bot.onText(/\/start/,(msg)=>{
    bot.sendMessage(msg.chat.id,"Hi this is telebot Sorry but the server isn't  working");
}
)
bot.on('message',async (msg) =>{
    const chatId =msg.chat.id;
    const reply = await openai.createCompletion({
        max_tokens:100,
        model : "ada",
        prompt : msg.text,
        temperature : 0.5,
    });
    bot.sendMessage(chatId, reply.data.choices[0].text);
});
