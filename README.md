# Mimir — Stateless Telegram Notes Bot for Study Groups

**Mimir** is a lightweight, zero-database Telegram bot that helps study groups share and organize PDF/image notes using folder-like tags (`Topic/Subtopic`). Instead of storing metadata, Mimir relies entirely on Telegram's built-in chat history and search, making it simple, free, and privacy-preserving.

---

## Highlights

- Stateless — no database, no external storage
- Tag files using `/upload [topic] [subtopic]`
- Save PDFs/images under clear folders (e.g., `OperatingSystems/Module1`)
- Leverages Telegram chat history and search
- Ideal for exam groups, classrooms, and study batches
- Free forever, lightweight to host, and no AI

---

## How It Works

1. A user types:

```

/upload OperatingSystems Module1

```

2. The bot replies:

   > “Please send a PDF or image to be saved in `OperatingSystems/Module1`.”

3. The user sends a file:

```
module1.pdf

```

4. The bot replies:
   > `module1.pdf` saved to `OperatingSystems/Module1`.

Mimir doesn't store anything externally — **your Telegram group becomes the permanent archive**.

---

## Retrieving Notes

Use **Telegram's built-in search** (top-right in the app) to find notes:

Examples:

```

OperatingSystems Module1
module1.pdf
AVL tree

```

You can also add hashtags or consistent keywords when uploading files to make search even more effective:

```

\#DSA #Module2

```

---

## Commands

| Command                      | Description                               |
| ---------------------------- | ----------------------------------------- |
| `/upload [topic] [subtopic]` | Set context for file upload               |
| `/howto`                     | Explains how to find notes using Telegram |
| `/reset`                     | Cancel current upload session             |
| `/ping`                      | Check if the bot is online                |
| `/help`                      | Show help message                         |

---

## Example Usage

```

/upload DSA Module2

```

> “Send a PDF or image to be saved in `DSA/Module2`.”
> `linkedlist.pdf`

> `linkedlist.pdf` saved to `DSA/Module2`.

Later, users can search:

```

DSA Module2
linkedlist

```

---

## Tech Stack

| Component | Choice      |
| --------- | ----------- |
| Language  | Node.js     |
| Framework | Telegraf.js |
| Hosting   | Render      |

---

## 🛠 Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/yourusername/mimir
cd mimir
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure `.env`**

```
BOT_TOKEN=your_telegram_bot_token
```

4. **Start the bot**

```bash
node index.js
```

---

## Why Use Mimir?

- No backend, no database, no headaches
- Zero user data stored — perfect for privacy-focused groups
- Structured note sharing with no extra setup
- Free forever — just run it once and forget it
- Ideal for college, coaching, or subject-specific Telegram groups

---

## License

MIT © 2025 \jsndz

---

## Need Help?

Open a GitHub issue or ping the creator on Telegram.
