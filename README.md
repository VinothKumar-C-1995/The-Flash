# ⚡ AirMind — Live AI File Transfer

Transfer files and text between any devices in real-time using WebSockets + AI enhancement.

## 🚀 Quick Start (Local)

```bash
npm install
npm start
```
Open http://localhost:3000 on any device on the same network.

---

## 🌍 Deploy Live (Free) — Render.com

1. Push this folder to a GitHub repo
2. Go to https://render.com → New → Web Service
3. Connect your GitHub repo
4. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Environment:** Node
5. Click Deploy → get a public URL like `https://airmind.onrender.com`
6. Open that URL on your phone AND laptop — they connect live!

---

## 🌍 Deploy Live (Free) — Railway.app

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

---

## 📦 Features

- ✅ Real-time text transfer (any device, any network)
- ✅ File transfer up to 50MB (images, PDFs, videos, docs, etc.)
- ✅ AI text enhancement (Claude API)
- ✅ Room-based (4-digit code to connect devices)
- ✅ Typing indicators
- ✅ Device presence (who's connected)
- ✅ Transfer history
- ✅ Drag & drop files
- ✅ One-click copy & download

## 🔧 Tech Stack

- **Backend:** Node.js + Express + Socket.io
- **Frontend:** Vanilla HTML/CSS/JS
- **AI:** Anthropic Claude API
- **Transport:** WebSocket (Socket.io)

## ⚙️ Environment Variables

None required for basic use. For production, you can set:
- `PORT` — server port (default: 3000)
