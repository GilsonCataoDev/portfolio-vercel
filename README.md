# Portfólio — Gilson Pereira

Site de portfólio em **React + TypeScript + Vite + Tailwind CSS v4**, pronto para publicar na Vercel.

- Dark mode editorial, bento grid assimétrico, animações que respeitam `prefers-reduced-motion`.
- HTML semântico, metadados SEO, Open Graph e JSON-LD (`Person`).
- Os projetos vêm de [`src/data/projects.json`](src/data/projects.json). Para adicionar um projeto, basta incluir um item no arquivo.

## Como rodar

```bash
npm install
npm run dev        # desenvolvimento
npm run build      # typecheck + build de produção em dist/
npm run preview    # serve o build localmente
```

## Como publicar na Vercel

1. Envie o repositório para o GitHub.
2. Na Vercel, **Add New → Project** e importe o repositório.
3. O preset **Vite** é detectado automaticamente (build: `npm run build`, saída: `dist`). Clique em **Deploy**.

Ou, pela CLI: `npx vercel --prod`.
