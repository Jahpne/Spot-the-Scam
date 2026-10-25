# 🛡️ Spot the Scam (OPEN//BUILD 2026 Hackathon)

> **Real or scam? You decide.** An offline-first, mobile-responsive web application designed to train users to spot financial fraud (fake bank alerts, phishing links, OTP theft, and POS scams) while providing an instant AI-powered and database-backed threat checker.

---

## 🚀 Live Demo & Links
* **Main Web Application**: [Visit Vercel Deployment](https://your-app-url.vercel.app) *(Replace with your Vercel URL)*
* **External Fraud Database (JSON Endpoint)**: [`https://scam-db-five.vercel.app/scam-db.json`](https://scam-db-five.vercel.app/scam-db.json)
* **Open-Source AI Model**: [`Qwen/Qwen2.5-0.5B-Instruct` on Hugging Face](https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct)

---

## 💡 The Problem
In regions with booming digital economies like Nigeria, financial fraud—such as fake debit/credit alerts, lookalike phishing domains, and social engineering tricks designed to steal One-Time Passwords (OTPs) and Bank Verification Numbers (BVNs)—costs everyday citizens millions of Naira. Many existing anti-fraud tools require stable, high-speed internet connections, failing users precisely when they are offline or in low-connectivity areas.

---

## 🛠️ How It Was Built & Tech Stack
This application was built entirely with performance, mobile responsiveness, and zero-framework speed in mind:
* **Frontend**: HTML5, Vanilla JavaScript (ES6+), and modern CSS3 (Custom Properties, Grid, Flexbox). No heavy frontend frameworks to ensure blazing-fast load times on mobile devices.
* **Database Layer**: A massive, externally hosted JSON database (`scam-db.json`) containing structured fraud scenarios, phishing vectors, and safe transaction patterns.
* **AI & Rule Engine**: Powered by a hybrid approach combining a lightning-fast regex heuristic rule engine with support for the open-source **`Qwen/Qwen2.5-0.5B-Instruct`** model executed via Transformers.js.
* **Offline Architecture**: Progressive Web App (PWA) standards with a custom Service Worker (`sw.js`) that caches all core application assets and the external database upon the first online visit.

---

## 🔌 The Offline-First Mechanism
1. **Initial Online Visit**: When the user opens the web app while online, the Service Worker (`sw.js`) automatically caches the app shell, stylesheets, scripts, manifest, and fetches the external JSON database (`https://scam-db-five.vercel.app/scam-db.json`).
2. **Subsequent Offline Use**: If the user loses internet connection or enters a low-connectivity zone, the Service Worker intercepts network requests and serves the cached database locally.
3. **Instant Lookup**: The scam checker queries the 1,500+ cached database entries in milliseconds directly from local browser storage, ensuring 100% offline functionality.

---

## 📂 Project Directory Structure

```text
spot-the-scam/
├── index.html        # Main app shell (home, game screens, & Scam Checker tab)
├── style.css         # Modern dark-mode styling with electric purple accents
├── data.js           # Built-in game scenarios and categories
├── checker.js        # Lightning-fast regex heuristic rule engine
├── scan.js           # Core scanner controller (fetches external DB & validates input)
├── game.js           # Game logic, scoring, and UI screen router
├── sw.js             # Service Worker for offline asset & database caching
├── manifest.json     # PWA mobile installation manifest
├── vercel.json       # Deployment headers for seamless Service Worker caching
└── README.md         # Project documentation and replication guide

🚀 How to Replicate This Project Locally
If you want to run or test this project on your local machine:

 Clone the Repository:
git clone [https://github.com/your-username/spot-the-scam.git](https://github.com/your-username/spot-the-scam.git)
cd spot-the-scam


Run a Local Static Server:
You can use Python or Node.js to serve the directory:
# Using Python 3
python3 -m http.server 8000


Open in Browser:
Navigate to http://localhost:8000 on your mobile simulator or browser.

📜 License
This project is open-source and distributed under the Apache 2.0 License. The underlying AI model (Qwen/Qwen2.5-0.5B-Instruct) is licensed under the Apache 2.0 open-source license by Alibaba Group.
Built with passion for the OSCA Ile-Ife OPEN//BUILD 2026 Hackathon.



---

### Summary
 **we solved a real African financial challenge** (fake bank alerts and SMS scams) using an **offline-first PWA architecture** that doesn't break when network connection drops, backed by **open-source AI and an external JSON database**. Best of luck—you've got a winning setup!
