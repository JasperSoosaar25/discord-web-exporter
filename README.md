# Discord Web Exporter 🌐

![License](https://img.shields.io/badge/license-MIT-5865f2?style=for-the-badge)
![Issues](https://img.shields.io/github/issues/JasperSoosaar25/discord-web-exporter?color=red&style=for-the-badge)
![Maintained](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge)

A high-performance, **client-side** web application designed to export Discord chat history. No downloads, no .NET runtimes—just pure JavaScript directly in your browser.

[**🚀 Launch Web App**](https://JasperSoosaar25.github.io/discord-web-exporter/)

---

### ✨ Key Features

* **🔒 Privacy First:** All processing happens locally. Your Discord token never touches a server.
* **📂 Triple-Format Export:** * **HTML:** Beautifully rendered chat logs with Discord-style formatting.
    * **JSON:** Raw data for developers and archival purposes.
    * **PDF:** Generate print-ready documents of your conversations.
* **⚡ Lightweight:** Built with vanilla JavaScript and Tailwind CSS for maximum speed and zero bloat.
* **📊 Live Progress:** Real-time logging shows you exactly how many messages are being fetched.

### 🛠️ Technical Highlights

This project was built to solve the limitations of desktop-only exporters:
* **Fetch API:** Utilizes direct requests to the Discord API.
* **Blob URLs:** Generates files on-the-fly in the browser memory for instant downloads.
* **Recursion Logic:** Efficiently handles message pagination to bypass Discord's 100-message limit.

### 📖 How to Use

1.  **Get your Token:** Find your Discord user token (keep it secret!).
2.  **Enter Channel ID:** Copy the ID of the channel you want to save.
3.  **Choose Format:** Click **Export to HTML**, **JSON**, or **PDF**.
4.  **Save:** Once the process hits 100%, your file will download automatically.

---

### ⚖️ Legal Disclaimer

*This tool is for educational and archival purposes only. Automating user accounts (self-bots) can be against Discord's Terms of Service. Use at your own risk.*

### 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---
<p align="center">Made with ❤️ for the Discord Community</p>
