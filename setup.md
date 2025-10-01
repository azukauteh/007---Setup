

---

## 🧠 `setup.md` — Agent 007 Diff Review Setup Guide

![Bond Animation](https://i.imgur.com/r8ID0B4.png)

Welcome to the Agent 007 code review system. This guide will help you install, configure, and run the agent locally or via webhook.

---

## 📦 Requirements

- [Bun](https://bun.sh/) runtime (v1.0+)
- Node.js (optional, for tooling)
- GitHub App (for webhook integration)
- `.env` file with API keys

---

## ⚙️ Installation

```bash
bun install
```

Installs all dependencies including `ai-sdk`, `bun-types`, and `zod`.

---

## 🔐 Environment Setup

Create a `.env` file in the root directory:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key
```

> 💡 Tip: You can override env vars with `{ override: true }` in `dotenv`.

---

## 🚀 Run the Agent Manually

```bash
bun run my-agent/index.ts
```

Streams code review output directly to your terminal.

---

## 🌐 Webhook Listener (Optional)

To enable GitHub PR automation:

```bash
bun run my-agent/server.ts
```

Expose it via [ngrok](https://ngrok.com/) or deploy to Vercel:

```bash
ngrok http 3000
```

Set the public URL as your GitHub App’s **Webhook URL**.

---

## 🧪 Test Locally

Open a pull request in a connected repo and watch the agent stream its review.

---

## 🧠 Next Steps

- ✅ Post review output as a GitHub comment  
- ✅ Add signature verification for webhook security  
- ✅ Deploy to Vercel or Render  
- ✅ Add CLI wrapper (`bunx review-agent`)  

---

## 🧼 Cleanup

To reset your workspace:

```bash
bun remove && rm -rf bun.lock node_modules
```

---

## 🧾 License & Credits

Agent 007 is built with [ai-sdk](https://sdk.vercel.ai), powered by Gemini 2.5 Flash, and designed for audit-grade modularity.

---

**Reviewed by Agent 007 — Modular. Typed. Audit-grade.**

---

