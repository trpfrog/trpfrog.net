# trpfrog.net

This is the main project, trpfrog.net.

## 📁 Directory Structure

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