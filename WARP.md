# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

GrayCode Editor is an AI-powered web IDE built with Next.js 15 that runs entirely in the browser. It combines Monaco Editor, WebContainers for in-browser code execution, and local AI models via Ollama for intelligent code completion and chat assistance.

## Commands

### Development
```bash
npm run dev              # Start development server on http://localhost:3000
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
```

### Database
```bash
npm run prisma:generate  # Generate Prisma client after schema changes
npx prisma db push       # Push schema changes to MongoDB
npx prisma studio        # Open Prisma Studio UI
```

### AI Models (Ollama)
Ollama must be running locally for AI features to work:
```bash
ollama run codellama     # Start CodeLlama model (default)
```

### Testing Individual Features
- **Playground**: Navigate to `/playground/[id]` after creating a playground
- **Templates**: Access via `/api/template/[id]` 
- **AI Chat**: Available in playground sidebar when AI is enabled
- **Code Completion**: Trigger with `Ctrl + Space` or double `Enter` in Monaco Editor

## Architecture

### Core Modules Structure

The app uses a modular architecture in the `modules/` directory:

- **`modules/playground/`**: Core IDE functionality
  - `actions/`: Server actions for playground CRUD operations
  - `components/`: Editor, file explorer, dialogs
  - `hooks/`: `usePlayground`, `useAISuggestion`, `useFileExplorer`
  - `lib/`: Editor configuration, file system transformation utilities

- **`modules/webcontainers/`**: In-browser runtime execution
  - `terminal.tsx`: xterm.js integration
  - `webcontainer-preview.tsx`: Live preview of running apps
  - `useWebContainer.ts`: WebContainer lifecycle management
  - `transformer.ts`: Converts file tree structure to WebContainer format

- **`modules/ai-chat/`**: AI assistant sidebar
  - Integrates with Ollama API at `localhost:11434`
  - Maintains conversation history

- **`modules/auth/`**: Authentication types and utilities
- **`modules/dashboard/`**: Dashboard views and types
- **`modules/home/`**: Landing page components

### App Router Structure

```
app/
├── (auth)/auth/sign-in/     # OAuth login page
├── (root)/                  # Protected routes group
├── api/
│   ├── auth/[...nextauth]/  # NextAuth.js endpoints
│   ├── chat/                # AI chat completions (Ollama)
│   ├── code-completion/     # AI code suggestions (Ollama)
│   └── template/[id]/       # Template loading API
├── dashboard/               # User dashboard
└── playground/[id]/         # Main IDE interface
```

### Data Flow

1. **Playground Loading**:
   - `usePlayground` hook fetches playground metadata from MongoDB via Prisma
   - Template files loaded from `TemplateFile` table or fallback to starter templates
   - File structure converted to WebContainer-compatible format

2. **Code Execution**:
   - Monaco Editor provides code editing interface
   - `useWebContainer` boots WebContainer instance
   - Files mounted to WebContainer file system
   - Terminal executes npm commands within container
   - Preview iframe displays running application

3. **AI Integration**:
   - **Code Completion**: POST to `/api/code-completion` with context, receives suggestions from Ollama
   - **Chat**: POST to `/api/chat` with message history, streams responses
   - Both APIs use `codellama:latest` model at `http://localhost:11434`

### Authentication Flow

- NextAuth.js v5 (beta) with Google & GitHub OAuth providers
- Middleware intercepts all routes (defined in `routes.ts`)
- Public routes: None by default
- Auth routes: `/auth/sign-in`
- Protected routes: `/`, `/dashboard`, `/playground/*`
- Session management via Prisma adapter with MongoDB

### Key Technologies

- **Next.js 15**: App Router with React Server Components
- **Monaco Editor**: VS Code's editor component
- **WebContainers**: StackBlitz's in-browser Node.js runtime
- **Ollama**: Local LLM inference (requires Docker/native installation)
- **Prisma**: ORM with MongoDB (connection pooling via Accelerate extension)
- **NextAuth.js v5**: Authentication with OAuth providers
- **TailwindCSS + ShadCN UI**: Styling and component library
- **xterm.js**: Terminal emulation
- **Zustand**: Likely used for client state (check playground hooks)

### Database Schema

**Key Models**:
- `User`: Auth data, role (USER/ADMIN/PREMIUM_USER)
- `Playground`: User-created projects with template type (REACT/NEXTJS/EXPRESS/VUE/HONO/ANGULAR)
- `TemplateFile`: Serialized file tree as JSON for each playground
- `ChatMessage`: AI chat history per user
- `StarMark`: User favorites for playgrounds

### Environment Variables Required

```env
AUTH_SECRET=<nextauth-secret>
AUTH_GOOGLE_ID=<google-oauth-client-id>
AUTH_GOOGLE_SECRET=<google-oauth-secret>
AUTH_GITHUB_ID=<github-oauth-client-id>
AUTH_GITHUB_SECRET=<github-oauth-secret>
DATABASE_URL=<mongodb-connection-string>
NEXTAUTH_URL=http://localhost:3000
```

### Special Configuration Notes

1. **CORS Headers**: Next.js config sets `Cross-Origin-Opener-Policy` and `Cross-Origin-Embedder-Policy` headers required for WebContainers to function properly

2. **Path Aliases**: `@/*` maps to project root in `tsconfig.json`

3. **React Strict Mode**: Disabled in `next.config.ts` (likely due to WebContainer initialization issues)

4. **Monaco Editor**: Custom configuration in `modules/playground/lib/editor-config.ts`

5. **Template Starters**: Located in `graycode-starters/` directory, served via static file loading

### File System Abstraction

The playground uses a custom file tree structure (`TemplateFolder` type) that gets transformed for different purposes:
- **Storage**: JSON in MongoDB `TemplateFile.content`
- **Editor**: File explorer tree structure
- **WebContainer**: Converted via `transformer.ts` to `FileSystemTree` format

## Common Development Patterns

### Adding New Template
1. Add template folder to `graycode-starters/`
2. Add enum value to `Templates` in `prisma/schema.prisma`
3. Add path mapping in `lib/template.ts`
4. Run `npm run prisma:generate`

### Creating New Playground Route
1. Use route groups: `(auth)` for public, `(root)` for protected
2. Check `middleware.ts` and `routes.ts` for auth behavior
3. Server components can directly `await auth()` for session

### Integrating New AI Model
- Update model name in `/api/code-completion/route.ts` and `/api/chat/route.ts`
- Adjust `temperature`, `max_tokens`, `top_p` parameters as needed
- Ensure Ollama is running with: `ollama run <model-name>`

### Working with WebContainers
- Always check `useWebContainer` hook for initialization state
- WebContainer needs specific CORS headers (already configured)
- File mounting is asynchronous - wait for boot completion
- Terminal commands run in WebContainer's isolated environment
