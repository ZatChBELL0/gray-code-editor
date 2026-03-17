# 🧠 Gray Code Editor – AI-Powered Web IDE

![Gray Code Editor Thumbnail](public/vibe-code-editor-thumbnaail.svg)

**Gray Code Editor** is a blazing-fast, AI-integrated web IDE built entirely in the browser using **Next.js App Router**, **WebContainers**, **Monaco Editor**, and **local LLMs via Ollama**. It offers real-time code execution, an AI-powered chat assistant, and support for multiple tech stacks — all wrapped in a stunning developer-first UI.

---

## 🚀 Features

- 🔐 **OAuth Login with NextAuth** – Supports Google & GitHub login.
- 🎨 **Modern UI** – Built with TailwindCSS & ShadCN UI.
- 🌗 **Dark/Light Mode** – Seamlessly toggle between themes.
- 🧱 **Project Templates** – Choose from React, Next.js, Express, Hono, Vue, or Angular.
- 🗂️ **Custom File Explorer** – Create, rename, delete, and manage files/folders easily.
- 🖊️ **Enhanced Monaco Editor** – Syntax highlighting, formatting, keybindings, and AI autocomplete.
- 💡 **AI Suggestions with Ollama** – Local models give you code completion on `Ctrl + Space` or double `Enter`. Accept with `Tab`.
- ⚙️ **WebContainers Integration** – Instantly run frontend/backend apps right in the browser.
- 💻 **Terminal with xterm.js** – Fully interactive embedded terminal experience.
- 🤖 **AI Chat Assistant** – Share files with the AI and get help, refactors, or explanations.

---

## 🧱 Tech Stack

| Layer         | Technology                                   |
|---------------|----------------------------------------------|
| Framework     | Next.js 15 (App Router)                      |
| Styling       | TailwindCSS, ShadCN UI                       |
| Language      | TypeScript                                   |
| Auth          | NextAuth (Google + GitHub OAuth)             |
| Editor        | Monaco Editor                                |
| AI Suggestion | Ollama (LLMs running locally via Docker)     |
| Runtime       | WebContainers                                |
| Terminal      | xterm.js                                     |
| Database      | MongoDB (via DATABASE_URL)                   |

---

## 🛠️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/ZatChBELL0/gray-code-editor.git
cd gray-code-editor
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file using the template:

```bash
cp .env.example .env.local
```

Then, fill in your credentials:

```env
AUTH_SECRET=your_auth_secret
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_secret
AUTH_GITHUB_ID=your_github_client_id
AUTH_GITHUB_SECRET=your_github_secret
DATABASE_URL=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
OLLAMA_API_URL=http://localhost:11434
OLLAMA_MODEL=codellama:latest
OLLAMA_TIMEOUT_MS=30000
```

### 4. Start Local Ollama Model

Make sure [Ollama](https://ollama.com/) and Docker are installed, then run:

```bash
ollama run codellama
```

Or use your preferred model that supports code generation.

### 5. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.


---

## 🎯 Keyboard Shortcuts & Autosave

* `Ctrl + Space` or `Double Enter`: Trigger AI suggestions
* `Tab`: Accept AI suggestion
* `Ctrl + S`: Save the active file
* `Ctrl + Shift + S`: Save all open files
* Active file auto-saves after ~4s of inactivity when changes are present
* `/`: Open Command Palette (if implemented)

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
└─ AI services → Ollama (configurable URL)
```

## 🛡️ Production Hardening Highlights

* AI endpoints now require authenticated users, validate payloads with Zod, and enforce request timeouts.
* Ollama connection is configurable via `OLLAMA_API_URL`, `OLLAMA_MODEL`, and `OLLAMA_TIMEOUT_MS` with central env parsing.
* Auto-save ensures active files persist after brief inactivity; global shortcuts cover save and save-all.
* `.env.example` documents required secrets for auth, database, and AI services.

---



## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

* [Monaco Editor](https://microsoft.github.io/monaco-editor/)
* [Ollama](https://ollama.com/) – for offline LLMs
* [WebContainers](https://webcontainers.io/)
* [xterm.js](https://xtermjs.org/)
* [NextAuth.js](https://next-auth.js.org/)

```
