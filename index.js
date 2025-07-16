import { Telegraf } from "telegraf";
import { TELEGRAM_TOKEN } from "./config.js";
import { message } from "telegraf/filters";
import express from "express";
const bot = new Telegraf(TELEGRAM_TOKEN);
const userUploadContext = new Map();
bot.start((ctx) =>
  ctx.reply(
    ` Welcome to *Mimir* — your study notes bot.

Use /upload <Topic> <Subtopic> to organize PDFs/images.

Type /help to see all commands.`,
    { parse_mode: "Markdown" }
  )
);

const helpText = `
 *Mimir Bot Commands*

/upload <Topic> <Subtopic>  → Set where your next file will be saved.  
Example: /upload DBMS Module2

/reset → Cancel current upload session

/howto  → Tips for finding notes later

/help  → Show this message

/ping  → Check if bot is online


*After /upload, send a PDF or image.*

*To find notes later*:  
Use Telegram search — type topic, subtopic, or file name.
`;

bot.command("help", (ctx) => ctx.reply(helpText, { parse_mode: "Markdown" }));

bot.command("quit", async (ctx) => {
  await ctx.telegram.leaveChat(ctx.message.chat.id);
  await ctx.leaveChat();
});
bot.command("ping", (ctx) => {
  ctx.reply("I'm alive!");
});

bot.command("upload", async (ctx) => {
  const text = ctx.message.text;
  const args = text.split(" ").slice(1);

  if (args.length >= 2) {
    const subject = args.slice(0, -1).join(" ");
    const module = args[args.length - 1];
    userUploadContext.set(ctx.from.id, { topic: subject, subtopic: module });

    ctx.reply(
      `📚 Preparing to upload...\nTopic: *${subject}*\nSubtopic: *${module}*\n\nNow send a PDF or image.`,
      { parse_mode: "Markdown" }
    );

    setTimeout(() => {
      userUploadContext.delete(ctx.from.id);
    }, 2 * 60 * 1000);
  } else {
    ctx.reply(" Usage:\n/upload <Subject> <Module>");
  }
});

bot.on("document", async (ctx) => {
  if (userUploadContext.has(ctx.from.id)) {
    const { topic, subtopic } = userUploadContext.get(ctx.from.id);
    const fileName = ctx.message.document.file_name;
    const savePath = `${topic}/${subtopic}`;

    ctx.reply(` *${fileName}* saved to *${savePath}* by ${ctx.from.username}`, {
      parse_mode: "Markdown",
    });

    userUploadContext.delete(ctx.from.id);
  } else {
    ctx.reply(" Please use /upload <topic> <subtopic> before sending a file.");
  }
});

bot.on("photo", async (ctx) => {
  if (userUploadContext.has(ctx.from.id)) {
    const photoArray = ctx.message.photo;
    const largestPhoto = photoArray[photoArray.length - 1];
    const { topic, subtopic } = userUploadContext.get(ctx.from.id);
    const savePath = `${topic}/${subtopic}`;

    ctx.reply(`Image saved to *${savePath}*  by ${ctx.from.username}`, {
      parse_mode: "Markdown",
    });
    userUploadContext.delete(ctx.from.id);
  } else {
    ctx.reply(" Please use /upload <topic> <subtopic> before sending a photo.");
  }
});

bot.command("reset", (ctx) => {
  userUploadContext.delete(ctx.from.id);
  ctx.reply("🧹 Upload context cleared.");
});

bot.command("howto", (ctx) => {
  ctx.reply(
    ` *How to Find Your Notes:*\nUse Telegram's built-in search bar (top-right in the app).\n\nTry searching:\n- OperatingSystems Module1\n- module1.pdf\n- AVL tree\n\nYou can also use hashtags when uploading: #DSA #Module2`,
    { parse_mode: "Markdown" }
  );
});

bot.on(message("text"), (ctx) => {
  if (userUploadContext.has(ctx.from.id)) {
    ctx.reply("Please send a *PDF or image* now.", {
      parse_mode: "Markdown",
    });
  }
});

bot.launch();
console.log("Mimir bot is running...");
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`🌐 Web server running at http://localhost:${PORT}`);
});
