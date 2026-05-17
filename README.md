# Discord Web Exporter 🌐

A lightweight, client-side web application to export Discord chat history to JSON. Inspired by [DiscordChatExporter](https://github.com/tyrrrz/discordchatexporter).

## 🚀 Features
* **Privacy First:** Your token never leaves your browser. Requests are made directly to Discord.
* **No Install:** No .NET runtime or installation required.
* **Tailwind CSS:** Clean, Discord-inspired dark mode UI.

## 🛠️ Setup & Usage
1. Clone this repository or download the ZIP.
2. Open `index.html` in any modern web browser.
3. **Important:** Due to Discord's [CORS policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), this will not work out-of-the-box on a standard web server. 
    * **Option A:** Use a browser extension like "CORS Unblock".
    * **Option B:** Run a local proxy.

## ⚠️ Security Warning
**Self-botting (using a user token) is technically against Discord's Terms of Service.** While exporting your own chats is usually overlooked, use this tool at your own risk. **Never** share your user token with anyone.

## 📜 License
MIT