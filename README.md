
# 🕵️‍♂️ 007 AI Agent

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

## 🛠️ Setup

1. **Clone the repository**  
   ```bash
   cd 007---Setup/my-agent
   ```

2. **Install dependencies**  
   ```bash
   bun install
   ```

3. **Configure API key**  
   Create a `.env` file in the `workspace` root:  
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your-google-api-key-here
   ```

4. **Run the agent**  
   ```bash
   bun run index.ts
   ```

> **Note**: Obtain your `GOOGLE_GENERATIVE_AI_API_KEY` from [Google AI Studio](https://aistudio.google.com).

---

## 🧠 How It Works

1. The agent uses `simple-git` to detect file changes in a specified directory.
2. Changes are analyzed by Gemini 2.5 Flash via `streamText()` from Vercel AI.
3. A custom system prompt ensures consistent tone, style, and focus for reviews.
4. Feedback is streamed in real-time to your terminal for immediate insights.

---

## 📁 Project Structure

```
workspace/
├── my-agent/
│   ├── index.ts              # Entry point
│   ├── package.json          # Dependencies
│   ├── tsconfig.json         # TypeScript config
│   └── .env                  # API key (loaded from parent if needed)
├── prompts.ts                # System prompt for reviewer behavior
├── tools.ts                  # Git diff tool integration
└── README.md                 # Project documentation
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

