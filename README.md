# 007 AI Code Review Agent

![Bond Animation](https://i.imgur.com/Nr9yi3B.png)

[![Bun](https://img.shields.io/badge/Bun-v1.1.29-brightgreen?logo=bun\&logoColor=white)](https://bun.sh)
[![Vercel AI SDK](https://img.shields.io/badge/Vercel_AI-SDK-black?logo=vercel\&logoColor=white)](https://sdk.vercel.ai)
[![Google AI SDK](https://img.shields.io/badge/@ai--sdk/google-Gemini_2.5_Flash-orange?logo=google\&logoColor=white)](https://www.npmjs.com/package/@ai-sdk/google)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Audit-grade AI code reviewer** that analyzes Git diffs, streams structured feedback, and enforces engineering best practices — file by file.

---

## 🚀 Overview

007 is a high-performance AI agent designed for **developers, teams, and CI pipelines**.
It inspects code changes, detects risks, and provides **actionable, structured feedback** focused on:

* 🔐 Security vulnerabilities
* 📄 API & documentation mismatches
* ⚙️ Scalability & maintainability
* 📊 Audit logging completeness

---

## ✨ Features

* 🔍 **Git-aware analysis** — detects and reviews file changes automatically
* 🧠 **LLM-powered insights** — fast, structured feedback using Gemini
* 🧵 **Streaming responses** — real-time output in your terminal
* 🛠️ **Modular tools** — pluggable architecture for diffing, formatting, and reporting
* ⚡ **Bun-native runtime** — fast installs and execution

---

## 🏗️ Architecture

The agent follows a modular, extensible design:

```
Input (Prompt)
   ↓
Git Diff Tool → AI Engine → Formatter → Output (Stream / File)
```

Supports:

* Pluggable formatters (Markdown, HTML, PDF)
* Custom tools for Git analysis
* Structured output for CI/CD pipelines

---

## 📦 Tech Stack

| Tool           | Purpose                    |
| -------------- | -------------------------- |
| Bun            | Runtime & package manager  |
| Vercel AI SDK  | Streaming AI orchestration |
| @ai-sdk/google | Gemini model integration   |
| Zod            | Input validation           |
| simple-git     | Git diff parsing           |
| dotenv         | Environment configuration  |

---

## 🛠️ Setup Guide

### 1. Clone the repository

```bash
cd 007---Setup/my-agent
```

---

### 2. Install Bun

```bash
curl -fsSL https://bun.sh/install | bash
bun --version
```

---

### 3. Install dependencies

```bash
bun install
```

---

### 4. Configure environment variables

Create a `.env` file in the **workspace root**:

```bash
touch .env
```

```env
GOOGLE_GENERATIVE_AI_API_KEY=your-api-key

AGENT_NAME=007
AGENT_MODE=diff-summary
LOG_LEVEL=info

PORT=3000
TIMEOUT_MS=10000
```

> 🔐 **Security Note**
>
> * Never commit `.env`
> * Always include `.env` in `.gitignore`
> * Use secrets management in production (CI/CD, cloud providers)

---

### 5. Run the agent

```bash
bun run index.ts
```

---

## 🧪 Example Usage

```ts
await codeReviewAgent(
  "Review changes in '../my-agent' and provide file-by-file feedback"
);
```

---

## 📥 Input Contract

```ts
type CodeReviewInput = {
  directory: string;
  instructions: string;
};
```

---

## 📤 Output Format

Structured audit-style response:

```
1. Issue Detected
2. Impact
3. Suggested Fix
4. Compliance Note
```

Streaming output is sent to:

* Terminal (stdout)
* Optional file exporters (Markdown, HTML, PDF)

---

## 📁 Project Structure

```
007---Setup/
├── README.md
├── package.json
├── bun.lock
├── .env.example          
│
├── my-agent/
│   ├── index.ts
│   ├── prompts.ts
│   ├── tools/
│   │   ├── gitDiff.ts
│   │   ├── markdownWriter.ts
│   │   ├── checkDuplicates.ts
│   │   └── commitMessage.ts
│   ├── test/
│   └── tsconfig.json
```

---

## 📊 Audit Logging

The agent is designed for traceability:

* Timestamped logs
* Configurable log levels (`info`, `warn`, `error`)
* CI/CD compatible output

> 🔧 Future Enhancements
>
> * Structured JSON logs
> * Trace IDs
> * External log sinks (Datadog, ELK)

---

## 🛡️ Security & Compliance

* 🔐 Secrets are never logged
* 📁 File access restricted to target directories
* 🧪 Input validation via schema enforcement
* 🚫 Sensitive files excluded from analysis

> ⚠️ Always rotate API keys and avoid exposing them in logs

---

## 🔌 Extensibility

* Add new **formatters** (PDF, HTML, JSON)
* Plug in additional **analysis tools**
* Integrate with:

  * CI pipelines
  * Git hooks
  * Code quality dashboards

---

## 🧭 Roadmap

* 🔄 Staged vs committed diff support
* 🧪 Test coverage analysis
* 🧾 Lint/type error summarization
* 🧠 Smarter review memory & context
* ☁️ Cloud deployment support

---

## 🧑‍💻 Author

Built by Azuka — backend engineer focused on scalable systems, AI tooling, and automation.

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

## 🙌 Contributing

Contributions are welcome.

* Open an issue
* Submit a pull request
* Suggest improvements

Let’s build better code review systems together.

---

![Bond Animation](https://i.imgur.com/q0j2xFK.png)
![Bond Animation](https://i.imgur.com/W33RTnP.png)

