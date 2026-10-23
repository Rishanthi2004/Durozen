# Durozen Technologies Website

The official website for Durozen Technologies Pvt. Ltd., built with Next.js and
designed to present the company's software engineering, cloud, AI, and product
development capabilities.

## Tech stack

- [Next.js 16](https://nextjs.org/) with the App Router
- React 19 and TypeScript
- Tailwind CSS 4 with the Tailwind Turbopack loader
- Framer Motion for animations
- Lucide React for icons

## Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 20+
- Git

## Getting started

Clone the repository and install dependencies:

```bash
git clone https://github.com/durozen-technologies/Durozen_Website.git
cd Durozen_Website
bun install
```

Start the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The
development server supports hot reloading as files change.

### npm alternative

The repository also includes `package-lock.json`, so npm can be used instead
of Bun:

```bash
npm install
npm run dev
```

Use the same command substitution for the other scripts:

```bash
npm run lint
npm run build
npm run start
```

## Available scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Start the local development server |
| `bun run lint` | Run ESLint |
| `bun run build` | Create a production build |
| `bun run start` | Serve the production build locally |

## Project structure

```text
src/
├── app/                 # Routes, layouts, metadata, and global styles
├── components/          # Reusable page sections and UI components
├── data/                # Structured content for services, projects, and gallery
└── utils/               # Shared utility functions

public/                  # Static images, icons, and other public assets
scripts/                 # Asset and branding utility scripts
image/                   # Source image assets
```

The site uses the Next.js App Router. Main content pages live under
`src/app/`, while dynamic routes such as project and service details use
bracketed route segments (for example, `src/app/services/[slug]`).

## Production build

Validate the application with the production build:

```bash
bun run lint
bun run build
```

After a successful build, start it with:

```bash
bun run start
```

## Deployment

This is a standard Next.js application and can be deployed to
[Vercel](https://vercel.com/) or another platform that supports Node.js
servers. Configure the project to run `bun run build` during deployment and
`bun run start` to serve the generated application when using a persistent
server.
