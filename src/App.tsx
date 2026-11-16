import type { ReactNode } from "react";
import { ArrowUpRight, Bot, Compass, Github, Globe, Linkedin, Wrench, type LucideIcon } from "lucide-react";
import projectsData from "./data/projects.json";

type Category = "web" | "automation" | "support";

type Project = {
  slug: string;
  category: Category;
  title: string;
  summary: string;
  stack: string[];
  repoUrl: string | null;
  demoUrl: string | null;
};

const projects = projectsData as Project[];

const GITHUB = "https://github.com/GilsonCataoDev";
const LINKEDIN = "https://www.linkedin.com/in/gilsondevjr";

const groups: { id: Category; island: string; title: string; intro: string; icon: LucideIcon }[] = [
  {
    id: "web",
    island: "Ilha 1",
    title: "Aplicações web e mobile",
    intro: "Produtos com front-end, API e banco de dados, vários deles na área da saúde.",
    icon: Globe,
  },
  {
    id: "automation",
    island: "Ilha 2",
    title: "Automação, dados e IA",
    intro: "Rotinas que rodam sozinhas, pipelines de dados e agentes com LLM.",
    icon: Bot,
  },
  {
    id: "support",
    island: "Ilha 3",
    title: "Suporte técnico",
    intro: "Ferramentas para o dia a dia de um atendimento N1/N2.",
    icon: Wrench,
  },
];

const skills: [string, string][] = [
  ["Front-end", "React, TypeScript, JavaScript, HTML, CSS, Tailwind, Vite, Next.js"],
  ["Back-end e dados", "Node.js, NestJS, PostgreSQL, Prisma, Python"],
  ["Automação e IA", "GitHub Actions, Playwright, integração com APIs de LLM, RAG"],
  ["Ferramentas", "Git, GitHub, Docker (básico), Vercel"],
  ["Suporte", "Windows (troubleshooting), PowerShell, Batch"],
];

const education: [string, string][] = [
  ["Em andamento", "Análise e Desenvolvimento de Sistemas (graduação)"],
  ["Em andamento", "Suporte de TI, Google"],
  ["Concluído", "Curso de cibersegurança, Cisco"],
  ["Formação de origem", "Farmácia"],
];

const nav = [
  ["sobre", "Sobre"],
  ["projetos", "Projetos"],
  ["competencias", "Competências"],
  ["formacao", "Formação"],
  ["contato", "Contato"],
] as const;

/** Chapéu de palha desenhado à mão (ilustração própria). */
function StrawHat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 100" className={className} role="img" aria-label="Chapéu de palha">
      <ellipse cx="70" cy="62" rx="64" ry="18" fill="#e8b630" stroke="#2b1d12" strokeWidth="4" />
      <path d="M26 58 C24 14 116 14 114 58 C94 70 46 70 26 58 Z" fill="#f2c94c" stroke="#2b1d12" strokeWidth="4" strokeLinejoin="round" />
      <path d="M27 50 C48 62 92 62 113 50 L114 58 C94 70 46 70 26 58 Z" fill="#b3261e" stroke="#2b1d12" strokeWidth="4" strokeLinejoin="round" />
      <path d="M52 22 C60 17 80 17 88 22" fill="none" stroke="#fff6d6" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Chapter({ n, title, id, children }: { n: number; title: string; id: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-t`} className="scroll-mt-24 py-10">
      <p className="mb-1 font-mono text-xs font-medium uppercase tracking-[0.2em] text-red" aria-hidden>
        Capítulo {n}
      </p>
      <h2 id={`${id}-t`} className="mb-6 font-display text-4xl md:text-5xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1">
      {children}
      <ArrowUpRight size={15} aria-hidden />
    </a>
  );
}

function Poster({ p, Icon }: { p: Project; Icon: LucideIcon }) {
  return (
    <article className="poster flex flex-col p-5">
      <p className="text-center font-display text-sm uppercase tracking-[0.3em] text-red" aria-hidden>
        Procurado
      </p>
      <div className="mx-auto my-3 flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-ink bg-straw" aria-hidden>
        <Icon size={26} strokeWidth={2.2} />
      </div>
      <h4 className="text-center font-display text-3xl leading-tight">{p.title}</h4>
      <p className="mt-3 flex-1 text-[0.98rem] leading-snug">{p.summary}</p>
      <p className="mt-4 border-t-2 border-dashed border-ink/40 pt-3 font-mono text-xs leading-relaxed text-muted">
        <span className="font-semibold text-ink">Tripulação:</span> {p.stack.join(" · ")}
      </p>
      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        {p.demoUrl && (
          <ExtLink href={p.demoUrl}>
            Site<span className="sr-only"> de {p.title}</span>
          </ExtLink>
        )}
        {p.repoUrl ? (
          <ExtLink href={p.repoUrl}>
            Código<span className="sr-only"> de {p.title}</span>
          </ExtLink>
        ) : (
          <span className="text-muted">Código privado</span>
        )}
      </p>
    </article>
  );
}

export default function App() {
  return (
    <>
      <a
        href="#projetos"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Ir para os projetos
      </a>

      <header className="sticky top-0 z-40 bg-paper">
        <nav aria-label="Principal" className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
          <a href="#inicio" className="flex items-center gap-2 font-display text-2xl">
            <Compass size={22} aria-hidden /> GP
          </a>
          <ul className="flex flex-wrap justify-end gap-x-5 gap-y-1 text-sm font-bold md:gap-x-7 md:text-base">
            {nav.map(([id, label]) => (
              <li key={id}>
                <a className="underline-offset-4 hover:text-red hover:underline" href={`#${id}`}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="frevo" aria-hidden />
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-16 md:px-8">
        <section id="inicio" className="fade-in py-10 md:py-16">
          <div className="panel grid items-center gap-6 p-6 md:grid-cols-[1fr_auto] md:gap-10 md:p-12">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-red">Pernambuco, Brasil</p>
              <h1 className="mt-2 font-display text-6xl leading-[0.95] md:text-8xl">Gilson Pereira</h1>
              <p className="mt-3 text-xl font-bold">Desenvolvedor em formação</p>
              <p className="mt-3 max-w-[48ch] text-lg">
                Zarpando de Pernambuco rumo à primeira vaga em TI. Front-end, back-end e automação, com estágio ou
                vaga júnior como próximo destino.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#projetos" className="btn bg-red text-paper">
                  Ver projetos <ArrowUpRight size={18} aria-hidden />
                </a>
                <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="btn bg-paper">
                  <Github size={18} aria-hidden /> GitHub
                </a>
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="btn bg-paper">
                  <Linkedin size={18} aria-hidden /> LinkedIn
                </a>
              </div>
            </div>
            <StrawHat className="sail mx-auto w-44 md:w-64" />
          </div>
        </section>

        <Chapter n={1} id="sobre" title="Sobre">
          <div className="max-w-[64ch] space-y-4">
            <p>
              Sou farmacêutico em transição para tecnologia e graduando em Análise e Desenvolvimento de Sistemas.
              Desenvolvo aplicações web com React, TypeScript e NestJS e automações em Python e Node.js.
            </p>
            <p>
              A experiência em saúde aparece nos projetos: prontuário e agenda clínica, consulta de medicamentos para
              farmácia e sites para profissionais da área. Conheço o problema de quem usa o sistema, e isso orienta as
              decisões de produto.
            </p>
            <p>
              Uso ferramentas de IA como apoio de estudo e implementação. Antes de apresentar um projeto, valido o
              comportamento, os testes e as limitações.
            </p>
            <p className="text-muted">
              Sou de Pernambuco e fã de anime, principalmente de One Piece, que inspirou o visual deste site.
            </p>
          </div>
        </Chapter>

        <Chapter n={2} id="projetos" title="Projetos">
          <div className="space-y-14">
            {groups.map((g) => (
              <div key={g.id}>
                <h3 className="font-display text-2xl md:text-3xl">
                  <span className="mr-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-red">{g.island}</span>
                  {g.title}
                </h3>
                <p className="mb-6 mt-1 text-muted">{g.intro}</p>
                <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                  {projects
                    .filter((p) => p.category === g.id)
                    .map((p) => (
                      <Poster key={p.slug} p={p} Icon={g.icon} />
                    ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-12 max-w-[64ch] text-muted">
            Alguns repositórios são privados e posso mostrá-los em conversa. Os demais projetos e estudos estão no{" "}
            <a className="link" href={GITHUB} target="_blank" rel="noopener noreferrer">
              meu GitHub
            </a>
            .
          </p>
        </Chapter>

        <Chapter n={3} id="competencias" title="Competências">
          <dl className="panel max-w-3xl divide-y-2 divide-ink/20 bg-poster">
            {skills.map(([k, v]) => (
              <div key={k} className="grid gap-1 px-5 py-3 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="font-bold">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </Chapter>

        <Chapter n={4} id="formacao" title="Formação">
          <dl className="panel max-w-3xl divide-y-2 divide-ink/20 bg-poster">
            {education.map(([k, v]) => (
              <div key={v} className="grid gap-1 px-5 py-3 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-red sm:pt-1.5">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </Chapter>

        <Chapter n={5} id="contato" title="Contato">
          <p className="max-w-[64ch]">
            Estou procurando estágio ou vaga júnior em front-end, suporte técnico ou desenvolvimento. O contato mais
            rápido é pelo{" "}
            <a className="link" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            . Meu código está no{" "}
            <a className="link" href={GITHUB} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            .
          </p>
        </Chapter>
      </main>

      <footer>
        <div className="frevo" aria-hidden />
        <p className="py-6 text-center font-mono text-xs text-muted">
          Gilson Pereira · feito em Pernambuco · {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}
