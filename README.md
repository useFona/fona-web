# Fona
## _Flow-Oriented Notes Application_

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/your-username/fona)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Fona is a distraction-free, flow-oriented notes application built to help you capture thoughts, code snippets, and research without breaking your focus. Designed for seamless browsing-to-note-taking transitions with a rich editing environment.

- Write in a distraction-free environment
- Capture thoughts without losing your flow
- ✨Magic ✨ JSON-powered modular structure

![Fona - Flow-Oriented Notes Application](./public/og.png)

# Features

- Flow-oriented note capturing designed for focus
- Rich text editing powered by Editor.js with modular blocks
- GitHub and Google OAuth authentication
- JSON-based storage for portable, structured content
- Browser extention to help you build notes without any pop up or tab switch

Fona embraces the philosophy that note-taking should enhance your thinking process, not interrupt it. The application provides a seamless bridge between browsing, researching, and capturing insights in one unified workspace.

This README itself demonstrates the clarity and structure that Fona brings to your documentation and note-taking workflow.

# Tech Stack

Fona leverages modern web technologies to deliver a fast, reliable experience:

- [Next.js] - Full-stack React framework for production
- [PostgreSQL] - Robust relational database for data persistence
- [Prisma] - Next-generation ORM with type safety
- [Editor.js] - Block-styled editor with clean JSON output
- [Better Auth] - Secure authentication with OAuth providers
- [Tailwind CSS] - Utility-first CSS framework for rapid UI development

And of course Fona itself is open source with a [public repository][fona-repo] on GitHub.

# Installation

Fona requires [Node.js](https://nodejs.org/) v18+ to run.

Clone the repository and install dependencies:

```sh
git clone https://github.com/your-username/fona.git
cd fona
npm install
```

Set up your environment variables by creating a `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/fona
DIRECT_URL=your_prisma_direct_url
BETTER_AUTH_SECRET=your_secret_key
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Initialize the database:

```sh
npx prisma generate
npx prisma db push
```

Start the development server:

```sh
npm run dev
```

# Pages

Fona provides a clean, focused interface across key pages:

| Route | Description |
| ------ | ------ |
| `/` | Landing page and project overview |
| `/dashboard` | User dashboard with saved notes and organization |
| `/editor` | Main note editing interface with Editor.js |

Editor data is stored in JSON format to support modular, portable writing experiences that can be easily exported, imported, or processed.

# Development

Want to contribute? Great!

Fona uses Next.js with hot reloading for fast development cycles. Make a change and see your updates instantly!

Open your terminal and run:

```sh
npm run dev
```

For database changes:

```sh
npx prisma studio
```

For type checking:

```sh
npm run type-check
```

### Building for Production

For production deployment:

```sh
npm run build
npm start
```

Generate a production build:

```sh
npm run build
npm run export
```

# Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Clone** your fork and create a feature branch:
   ```sh
   git checkout -b feature/amazing-feature
   ```
3. **Make** your changes following our coding standards
4. **Commit** your changes with clear messages
5. **Push** to your branch and open a Pull Request

## Guidelines

- Raise an issue before starting work on major features
- Follow the existing project structure and TypeScript conventions
- Keep PRs focused and include proper descriptions
- Add tests for new functionality where applicable

## Found a Bug?

Create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, etc.)

# Roadmap

- [x] Core note-taking functionality with Editor.js
- [x] User authentication with GitHub/Google
- [x] Dashboard and note organization
- [X] Chrome Extension for seamless web clipping
- [ ] Collaborative editing features
- [ ] Mobile application
- [ ] API for third-party integrations

# License

MIT

**Free Software, Hell Yeah!**

---

Built with ❤️ by [Meet Jain]

[fona-repo]: <https://github.com/useFona/fona-web>
[Next.js]: <https://nextjs.org/>
[PostgreSQL]: <https://www.postgresql.org/>
[Prisma]: <https://www.prisma.io/>
[Editor.js]: <https://editorjs.io/>
[Better Auth]: <https://www.better-auth.com/>
[Tailwind CSS]: <https://tailwindcss.com/>
[Meet Jain]: <https://github.com/not-meet>
