# ⚡ The Flash — Real-Time File & Text Transfer

> Share files and text instantly between any devices — no app download, no account needed.

**Live at:** [https://vinothkumar.online](https://vinothkumar.online)

---

## ✨ Features

- 📁 **File Transfer** — Send files up to 50MB between devices in real-time
- 💬 **Text Transfer** — Share text, links, and messages instantly
- 🤖 **AI Enhancement** — Optional Claude AI to improve your text before sending
- 🔑 **Room Codes** — 4-digit codes to create private rooms between devices
- 📱 **Any Device** — Works on phone, tablet, laptop — just open the URL
- 🔒 **Free HTTPS** — SSL certificate included automatically via Render + Cloudflare

---

## 🚀 Live Demo

Open on any two devices and transfer instantly:

```
https://vinothkumar.online
https://www.vinothkumar.online
```

1. **Device A** → Click `Create Room` → get a 4-digit code
2. **Device B** → Visit the same URL → enter the code → click `Join Room`
3. Send files or text — appears on the other device instantly ✅

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js + Express |
| Real-time | Socket.io (WebSockets) |
| Frontend | HTML, CSS, Vanilla JS |
| Hosting | Render.com (free tier) |
| DNS | Cloudflare |
| Domain | GoDaddy → vinothkumar.online |
| AI | Anthropic Claude API |
| Uptime | UptimeRobot (keeps server awake 24/7) |

---

## 📁 Project Structure

```
airmind/
├── server.js          ← Node.js + Socket.io backend server
├── package.json       ← Dependencies (express, socket.io)
├── README.md          ← This file
└── public/
    └── index.html     ← Full frontend (HTML + CSS + JS)
```

---

## ⚙️ Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/airmind-backend.git
cd airmind-backend

# 2. Install dependencies
npm install

# 3. Start the server
node server.js

# 4. Open in browser
npm run dev 
# http://localhost:3000
```

---

## 🌐 Deployment

This project is deployed on **Render.com** with a custom domain via **Cloudflare**.

### Stack

```
GoDaddy (domain owner)
    ↓ nameservers point to
Cloudflare (DNS management + CNAME flattening)
    ↓ CNAME points to
Render.com (Node.js server hosting)
    ↓ serves
https://vinothkumar.online
```

### Environment Variables

| Variable | Value |
|---|---|
| `PORT` | Set automatically by Render |

### Build & Start Commands (Render settings)

```
Build Command:   npm install
Start Command:   node server.js
```

---

## 🤖 UptimeRobot — Keeping the Server Awake

### Why UptimeRobot is Needed

Render's **free tier** automatically puts the server to sleep after **15 minutes of inactivity**. When a visitor opens the site after it has been sleeping, they wait **30–60 seconds** for it to wake up — the app shows "Offline" during this time.

**UptimeRobot** solves this by pinging the server every **5 minutes**, keeping it permanently awake at zero cost.

### How It Works

```
UptimeRobot pings https://vinothkumar.online every 5 minutes
        ↓
Render server receives the ping — stays awake
        ↓
First visitor gets instant response — no waiting ✅
```

### Current Monitor Setup

| Setting | Value |
|---|---|
| **Service** | UptimeRobot (free plan) |
| **Monitor Type** | HTTP(s) |
| **URL being pinged** | `https://vinothkumar.online` |
| **Ping interval** | Every 5 minutes |
| **Uptime (last 24h)** | 100% |
| **Alert** | Email notification if site goes down |

### How to Set Up UptimeRobot (for your own deployment)

1. Go to [uptimerobot.com](https://uptimerobot.com) → sign up free
2. Click **"+ New Monitor"**
3. Fill in the settings:

```
Monitor Type:     HTTP(s)
Friendly Name:    AirMind - vinothkumar.online
URL:              https://vinothkumar.online
Interval:         5 minutes
```

4. Click **"Create Monitor"**
5. Done — your server stays awake 24/7 ✅

### Updating the Monitor URL

If you change your domain, update UptimeRobot:

1. Go to UptimeRobot dashboard
2. Click **"..."** next to the monitor → click **"Edit"**
3. Change the **URL** field to your new domain
4. Change the **Friendly Name** to match
5. Click **"Save changes"**

### Status Indicators

| Status | Meaning |
|---|---|
| 🟢 Up | Server is awake and responding normally |
| 🔴 Down | Server is unreachable — check Render dashboard |
| ⏸️ Paused | Monitor is paused — server may go to sleep |

> **Note:** If you see a brief "Down" right after updating the URL — this is normal. UptimeRobot needs 1–2 pings to confirm the new URL is reachable.

---

## 🔧 Making Changes

Every `git push` to the `main` branch triggers an **automatic redeployment** on Render.

```bash
# Make your changes to any file, then:
git add .
git commit -m "Your change description"
git push

# Render detects the push and redeploys automatically in ~1-2 minutes
# Visit https://vinothkumar.online to see your changes live
```

> After deploying, do a **hard refresh** in your browser:
> - Windows: `Ctrl + Shift + R`
> - Mac: `Cmd + Shift + R`

---

## 🔒 Cloudflare DNS Settings

| Type | Name | Target | Proxy |
|---|---|---|---|
| CNAME | `@` | `your-app.onrender.com` | ⬜ DNS only (grey) |
| CNAME | `www` | `your-app.onrender.com` | ⬜ DNS only (grey) |

> **Important:** Proxy must be set to **grey (DNS only)** — not orange.
> The orange Cloudflare proxy breaks Socket.io WebSocket connections.

---

## ⚠️ Known Limitations

| Limitation | Detail |
|---|---|
| Free tier cold start | First visit after 15min idle = 30–60s wait (fixed by UptimeRobot) |
| File size limit | Maximum 50MB per transfer |
| Room persistence | Rooms exist only while the server is running — restart clears all rooms |
| No end-to-end encryption | Files pass through the server — do not transfer sensitive data |

---

## 📄 License

MIT License — free to use and modify.

---

## 👤 Author

**Vinoth Kumar C**
https://www.linkedin.com/in/c-vinoth-kumar/
