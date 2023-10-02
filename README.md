<h1 align="center">
  🎺 <a href="https://trpfrog.net">trpfrog.net</a> 🐸
</h1>
<p align="center">
  My personal website built with Next.js App Router and TypeScript
</p>

![](./public/images/screenshot.png)

## 🧩 Built with

- **Node.js**
- **React**
- **Node.js**
- **TypeScript**
- **Bun** for package management
- **Vercel** for website hosting
- **Cloudinary** for image CDN
- **next-mdx-remote** for rendering blog articles from Markdown
- **Cloud Functions** for the image generation endpoint of *trpfrog-diffusion*
- **HuggingFace** for image generation using *Prgckwb/trpfrog-diffusion*
- **Vercel KV** for image cache of *trpfrog-diffusion*
- **OpenAI API** for resolving ambiguous URLs and generating prompts for *trpfrog-diffusion*
- **microCMS** for hosting draft articles
- **PlanetScale** for database of Twitter archives

and so on...

## 🐤 Getting Started

First, install the dependencies:

```sh
bun install  # or: npm install
```

Next, run the development server:

```sh
bun dev  # or: npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚗 Requirements

- Node.js 18.x

## 📂 Directory Structure

```
.
├── public/
├── tools/              # Some useful scripts
└── src/
    ├── app/            # App Router
    ├── components/     # Components
    │   ├── atoms/      # -- Atom components     (Atomic Design Lv.1)
    │   ├── molecules/  # -- Molecule components (Atomic Design Lv.2)
    │   ├── organisms/  # -- Organism components (Atomic Design Lv.3)
    │   ├── head/       # -- Components for <head> (e.g. Google Fonts, favicons)
    │   └── utils/      # -- Wrapper components for some libraries which does not supports RSC
    ├── data/           # Data for some pages
    ├── hooks/          # React hooks
    ├── lib/            # Utilities, helpers, types
    ├── pages/ 
    ├── posts/          # Markdown files for /blog
    ├── prisma/         # Schema definition for tweets DB
    └── styles/         # Stylesheets
```

## 🛠️ Troubleshooting

### Something went wrong installing the "sharp" module

"Something went wrong installing the "sharp" module..." error occurs on Apple Silicon Macs. 
To fix this, run the following commands:

```sh
bun install --platform=darwin --arch=x64 sharp
npm rebuild --platform=darwin --arch=arm64 sharp
```
