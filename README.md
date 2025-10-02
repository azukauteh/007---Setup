

# 007 AI  code review Agent
![Bond Animation](https://i.imgur.com/Nr9yi3B.png)


[![Bun](https://img.shields.io/badge/Bun-v1.1.29-brightgreen?logo=bun&logoColor=white)](https://bun.sh)
[![Vercel AI SDK](https://img.shields.io/badge/Vercel_AI-SDK-black?logo=vercel&logoColor=white)](https://sdk.vercel.ai)
[![Google AI SDK](https://img.shields.io/badge/@ai--sdk/google-Gemini_2.5_Flash-orange?logo=google&logoColor=white)](https://www.npmjs.com/package/@ai-sdk/google)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Copilot](https://img.shields.io/badge/Microsoft_Copilot-AI_Companion-blueviolet?logo=microsoft&logoColor=white)](https://www.microsoft.com/en-us/copilot)

> A blazing-fast, audit-grade AI code reviewer powered by [Bun](https://bun.sh), [Vercel AI SDK](https://sdk.vercel.ai), and [@ai-sdk/google](https://www.npmjs.com/package/@ai-sdk/google).  

> This agent analyzes Git diffs, streams intelligent feedback, and helps you maintain clean, scalable codebases—file by file.

---

## 🚀 Features

- **🔍 Git-aware code review**: Automatically detects file changes and provides AI-powered suggestions.
- **🧠 Gemini 2.5 Flash**: Leverages Google’s latest LLM for fast, insightful feedback.
- **🛠️ Custom tools**: Includes `getFileChangesInDirectoryTool` for precise diff analysis.
- **📦 Bun-native**: Lightning-fast startup, dependency resolution, and native `.env` support.
- **🧵 Real-time streaming**: Delivers feedback directly to your terminal as it’s generated.

---

## 📦 Tech Stack

| Tool                     | Purpose                                |
|--------------------------|----------------------------------------|
| **Bun**                  | Runtime & package manager              |
| **Vercel AI**            | Streaming AI orchestration             |
| **@ai-sdk/google**       | Gemini model integration               |
| **Zod**                  | Schema validation for tool inputs      |
| **simple-git**           | Git diff parsing and file tracking     |
| **dotenv**               | Environment variable management        |

---


## 🛠️ Setup Guide

### 1. **Clone the repository**  
Navigate to the agent directory:

```bash
cd 007---Setup/my-agent
```

### 2. Install Bun 
Bun is a fast JavaScript runtime. To install it:

```bash
curl -fsSL https://bun.sh/install | bash
```

 verify:

```bash
bun --version
```

> 💡 If you're using Linux, make sure `~/.bun/bin` is added to your `PATH`.

---


### 3. Install dependencies
Run:

```bash
bun install
```

This installs all packages listed in `package.json`.

---

### 4.Configure your `.env` file**  
Create a `.env` file in the workspace root (`007---Setup/`):

```bash
touch .env
```

Then add your API key and runtime settings:

```env
# === API Keys ===
GOOGLE_GENERATIVE_AI_API_KEY=your-google-api-key-here

# === Agent Configuration ===
AGENT_NAME=007
AGENT_MODE=diff-summary
LOG_LEVEL=info

# === Git Integration ===
GIT_AUTHOR=Azuka
GIT_EMAIL=example@gmail.com

# === Runtime Settings ===
PORT=3000
TIMEOUT_MS=10000
```
> 🔐 **Important**: Never commit `.env` to version control. Add it to `.gitignore`.

---

### 5. **Verify `.env` is loaded correctly**  
In `index.ts`, you can temporarily add:

```ts
console.log("Loaded API key:", process.env.GOOGLE_GENERATIVE_AI_API_KEY);
```

Run:

```bash
bun run my-agent/index.ts
```

If it prints your key, you're good to go.

---

### 6. Run the agent 
Start the agent:

```bash
bun run my-agent/index.ts    
```

It will stream code review output based on your prompt.


![Bond Animation](https://i.imgur.com/q0j2xFK.png)
![Bond Animation](https://i.imgur.com/W33RTnP.png)

---


## 🧠 How It Works

1. The agent uses `simple-git` to detect file changes in a specified directory.
2. Changes are analyzed by Gemini 2.5 Flash via `streamText()` from Vercel AI.
3. A custom system prompt ensures consistent tone, style, and focus for reviews.
4. Feedback is streamed in real-time to your terminal for immediate insights.

---

## 📁 Project Structure

```
007---Setup/                      # 🧠 Workspace root
├── README.md                     # Workspace-level documentation
├── bun.lock                      # Bun lockfile for reproducible installs
├── package.json                  # Workspace config (can declare workspaces)
├── setup.md                      # Contributor onboarding guide
│
├── my-agent/                     # 🧠 Modular agent logic
│   ├── index.ts                  # Agent entry point
│   ├── package.json              # Agent-specific dependencies and scripts
│   ├── tsconfig.json             # TypeScript config scoped to agent
│   ├── .env                      # API keys and runtime settings
│
│   ├── prompts.ts                # System prompt for reviewer behavior
│   ├── tools/                    # 🔧 Modular tools
│   │   ├── gitDiff.ts            # Git diff integration
│   │   ├── markdownWriter.ts     # Markdown formatting utility
│   │   ├── commitMessage.ts      # Commit message generator
│   │   └── checkDuplicates.ts    # Duplicate file detection
│
│   ├── test/                     # ✅ Agent tests
│   │   ├── agent.test.ts         # Prompt handling and edge cases
│   │   └── tools.test.ts         # Git tooling and utilities
│
│   └── setup.md                  # Agent-specific onboarding 

```

---

## 🧪 Example Usage

```ts
await codeReviewAgent(
  "Review the code changes in '../my-agent' directory, make your reviews and suggestions file by file"
);
```

This triggers a file-by-file review of changes in the specified directory, with suggestions streamed to your terminal.

---

## 🛡️ Security & Auditability

- **File filtering**: Excludes sensitive files like `bun.lock` and `dist/`.
- **Audit-grade design**: Built for reliable, reproducible code reviews.
- **Extensible**: Easily integrates with CI pipelines or commit history analysis.

---

## ✨ Roadmap

- 🔄 Support for staged vs. committed diff reviews
- 🧪 Test coverage analysis
- �� Summarization of lint and type errors
- 🧭 Contributor onboarding assistant

---

## 🧑‍💻 Author

Built by [Azuka](https://github.com/your-username), a backend engineer passionate about automation, reproducibility, and scalable systems. Connect on [X](https://x.com/your-username) for updates or collaboration!

---

## 📄 License

[MIT License](LICENSE) — fork, remix, and deploy your own 007 AI Agent with freedom.

---

## 🙌 Contributing

Contributions are welcome! Please open an issue or pull request on [GitHub](https://github.com/your-007-agent/workspace). Let’s build better code review tools together.

```

