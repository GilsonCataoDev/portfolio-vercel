# Portfólio — Gilson Pereira

Site em **React + TypeScript + Vite + Tailwind CSS v4**, publicado na Vercel: https://gilson-pereira.vercel.app

- Tema de mangá com referências a One Piece e a Pernambuco (faixa de frevo, cartazes de "procurado", ondas).
- Acessibilidade: HTML semântico, alvos de toque de 44px, foco visível e animações que respeitam `prefers-reduced-motion`.
- SEO: metadados, Open Graph com imagem de compartilhamento e JSON-LD (`Person`).
- Os projetos vêm de [`src/data/projects.json`](src/data/projects.json). Para adicionar um, inclua um item no arquivo. Campos opcionais `shot` e `shotH` mostram uma captura de tela no cartaz (imagens em `public/shots/`).

## Como rodar

```bash
npm install
npm run dev        # desenvolvimento
npm run build      # typecheck + build de produção em dist/
npm run preview    # serve o build localmente
```

## Como publicar na Vercel

1. Na Vercel, **Add New → Project** e importe este repositório.
2. O preset **Vite** é detectado (build: `npm run build`, saída: `dist`). Clique em **Deploy**.

Ou, pela CLI: `npx vercel --prod`.
