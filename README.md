<p align="center">
  <a href="https://trpfrog.net">
    <img alt="" src="https://res.cloudinary.com/trpfrog/image/upload/v1717325153/kawaii-with-outline.png" width="500" height="auto">
  </a>
</p>

<h1 align="center">trpfrog.net</h1>
<p align="center">
  A monorepo for my personal website, <a href="https://trpfrog.net">trpfrog.net</a>, built with Next.js and TypeScript.
</p>

![](./apps/trpfrog.net/public/images/screenshot.png)

## 🧩 Technology Stack

- **Node.js**
- **TypeScript** with `better-typescript-lib`
- **Vitest**
- **Tailwind CSS**
- **React** (with React Compiler)
- **pnpm**
- **ESLint**
- **Prettier**
- **Turborepo** for monorepo management
- **Valibot** for schema validation
- **ts-pattern** for pattern matching

### trpfrog.net

- **Next.js** for building the website
- **Vercel** for website hosting
- **CSS Modules** for *complex* styling
- **Vanilla Extract** for *more complex* styling
- **Hono** for BFF (`hono/vercel`) and middlewares
- **Cloudinary** for image CDN
- **next-mdx-remote** for rendering blog articles from Markdown
- **OpenAI API** for resolving ambiguous URLs (`trpfrog.net/fuzzy`)
- **microCMS** for hosting draft articles
- ~~**PlanetScale** for database of Twitter archives~~
  - Due to the discontinuation of PlanetScale's hobby plan, we are planning to migrate to Cloudflare D1.

### trpfrog-diffusion (AI-powered TrpFrog Icon Generation)

- **Hono** for API endpoints
- **Cloudflare Workers** for hosting the API
- **OpenAI API** for generating prompt
- **Gemini API** for image generation (nano-banana)
- **Cloudflare Workers KV** for caching generated images
- **Cloudflare D1** for storing metadata of generated images
- **Drizzle ORM** for interacting with Cloudflare D1
- **Cloudflare R2** for storing generated images

### dev-blog-server

- **Hono** for API endpoints

and so on...

## 🐤 Getting Started

First, install the dependencies:

```sh
pnpm install
```

Next, run the development server:

```sh
pnpm run -w dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To build this project, just run below:

```sh
pnpm run -w build
```

## 🚗 Requirements

- Node.js 20.x
- pnpm 9.x

## 📦 Project Structure

We are using a monorepo. The package structure is as follows.

```
.
├── apps                    # Applications
│   ├── trpfrog.net           # Main project, trpfrog.net
│   ├── dev-blog-server       # SSE server for editing blog posts
│   └── image-generation      # API Endpoints for trpfrog-diffusion
├── packages                # Libraries
│   ├── config-tailwind       # Shared Tailwind CSS config
│   ├── config-typescript     # Shared TypeScript config
│   ├── config-vitest         # Shared Vitest config
│   ├── constants             # Constants used by some packages
│   ├── posts                 # Utilities for posts
│   └── utils                 # Utilities used by some packages
├── posts/                  # Blog posts
│   └── *.md
├── README.md
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── prettier.config.js
├── turbo.json
└── vitest.workspace.ts
```

## 💚 Contribution

**Welcome!** and thank you for your interest in contributing! Please keep the following in mind:

1. **No Major \*Content\* Changes or Additions**
   This is a personal site by @trpfrog. Major content changes or new additions that might alter the original intent of the website are not accepted.

2. **License Notice**
   This project may switch to the **MIT License** in the future. Contributions will follow the same license at that time.

3. **Improvements and Suggestions Welcome**
   Improvements, such as refactoring or typo fixes, are welcome through Pull Requests.
   We also welcome new content ideas and suggestions via Issues.

Thank you for your understanding and support!
