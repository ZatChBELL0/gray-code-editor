# 🧠 Gray Code Editor – AI-Powered Web IDE

![Gray Code Editor Thumbnail](public/vibe-code-editor-thumbnail.svg)

Gray Code Editor is an AI-assisted, browser-based IDE built with **Next.js App Router**, **WebContainers**, **Monaco Editor**, and **local LLMs via Ollama**. It ships with OAuth login, rich file management, inline AI completions, and an integrated terminal so you can prototype full-stack apps without leaving the browser.

---

## 🚀 Features

- 🔐 **OAuth with NextAuth** – Google & GitHub providers out of the box.
- 🎨 **Modern UI** – TailwindCSS + ShadCN components with light/dark themes.
- 🧱 **Project Templates** – React, Next.js, Express, Hono, Vue, and Angular starters.
- 🗂️ **Custom File Explorer** – Create, rename, delete, and organize files/folders.
- 🖊️ **Monaco Editor** – Syntax highlighting, formatting, keybindings, and inline AI autocomplete.
- 🤖 **AI Suggestions via Ollama** – Trigger with `Ctrl + Space` or double `Enter`, accept with `Tab`.
- ⚙️ **WebContainers** – Run frontend/backend apps instantly in the browser.
- 💻 **Embedded Terminal** – Fully interactive xterm.js experience.
- 🧑‍🤝‍🧑 **AI Chat Assistant** – Share files with the AI for refactors, fixes, and explanations.

---

## 🧱 Tech Stack

| Layer         | Technology                               |
| ------------- | ---------------------------------------- |
| Framework     | Next.js 16 (App Router)                  |
| Styling       | TailwindCSS, ShadCN UI                   |
| Language      | TypeScript                               |
| Auth          | NextAuth (Google + GitHub OAuth)         |
| Editor        | Monaco Editor                            |
| AI Suggestion | Ollama (local LLMs)                      |
| Runtime       | WebContainers                            |
| Terminal      | xterm.js                                 |
| Database      | MongoDB (via `DATABASE_URL`)             |

---

## 🛠️ Getting Started

### Prerequisites
- Node.js **18.18+** (Node 20 recommended)
- npm
- Docker + [Ollama](https://ollama.com/) for local LLMs

### 1. Clone the repo

```bash
git clone https://github.com/DANISH-AKHTAR-242/gray-code-editor.git
cd gray-code-editor
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local env file and fill in your secrets:

```bash
cp .env.example .env.local
```

Key variables:

| Name | Description |
| --- | --- |
| `AUTH_SECRET` | NextAuth secret for JWT/encryption. |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Google OAuth credentials. |
| `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` | GitHub OAuth credentials. |
| `DATABASE_URL` | MongoDB connection string. |
| `NEXTAUTH_URL` | App URL (e.g., `http://localhost:3000`). |
| `OLLAMA_API_URL` | Ollama endpoint (defaults to `http://localhost:11434`). |
| `OLLAMA_MODEL` | Model name/tag (e.g., `codellama:latest`). |
| `OLLAMA_TIMEOUT_MS` | Request timeout in milliseconds (default 30000). |

### 4. Start a local Ollama model

```bash
ollama run codellama
```

You can swap in any model that supports code generation.

### 5. Run the development server

```bash
npm run dev
```

Visit `http://localhost:3000` to start building.

---

## 📚 Useful Scripts

- `npm run dev` – Start the Next.js dev server.
- `npm run lint` – Run ESLint against the project.
- `npm run build` – Create a production build.
- `npm run start` – Serve the production build.
- `npm run prisma:generate` – Regenerate the Prisma client (database access layer). Run this after schema changes; it also runs automatically on install.

---

## 🎯 Keyboard Shortcuts & Autosave

- `Ctrl + Space` or **double Enter**: Trigger AI suggestions
- `Tab`: Accept AI suggestion
- `Ctrl + S`: Save the active file
- `Ctrl + Shift + S`: Save all open files
- Active file auto-saves after ~4s of inactivity when changes exist
- `/`: Open Command Palette (if enabled)

---

## 🏗️ Architecture at a Glance

```
Next.js App Router (UI)
├─ app/(root) landing + auth
├─ app/dashboard (project list)
└─ app/playground/[id] (IDE workspace)
    ├─ Monaco editor + AI inline completions
    ├─ File explorer (Zustand)
    ├─ WebContainers (terminal + preview)
    └─ AI chat + code-completion APIs

Server
├─ NextAuth (Google/GitHub)
├─ Prisma → MongoDB
└─ AI services → Ollama (configurable URL & timeout)
```

## 🛡️ Production Hardening Highlights

- AI endpoints require authenticated users, validate payloads with Zod, and enforce request timeouts.
- Ollama connection is configured via `OLLAMA_API_URL`, `OLLAMA_MODEL`, and `OLLAMA_TIMEOUT_MS` with centralized env parsing.
- Auto-save keeps active files persisted after brief inactivity; global shortcuts cover save and save-all.
- `.env.example` documents the required secrets for auth, database, and AI services.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [Ollama](https://ollama.com/) – for offline LLMs
- [WebContainers](https://webcontainers.io/)
- [xterm.js](https://xtermjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
