import { useEffect, type ReactNode } from "react";
import { ArrowUpRight, Github, Linkedin, Lock, ExternalLink, Code2 } from "lucide-react";
import clsx from "clsx";
import projectsData from "./data/projects.json";

type Project = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  repoUrl: string | null;
  demoUrl: string | null;
  featured: boolean;
};

const projects = projectsData as Project[];
const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);

const GITHUB = "https://github.com/GilsonCataoDev";
const LINKEDIN = "https://www.linkedin.com/in/gilsondevjr";

// Padrão assimétrico do bento grid (colunas de 6 no desktop).
const spans = ["lg:col-span-4", "lg:col-span-2", "lg:col-span-2", "lg:col-span-4", "lg:col-span-3", "lg:col-span-3"];

const stack = [
  { group: "Front-end", items: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind", "Vite"] },
  { group: "Back-end e dados", items: ["Node.js", "NestJS", "PostgreSQL", "Prisma", "Python"] },
  { group: "Ferramentas", items: ["Git", "GitHub", "Docker (básico)", "Playwright"] },
  { group: "Suporte", items: ["Windows (troubleshooting)", "PowerShell", "Batch"] },
];

const principles = [
  { t: "Aprendo construindo", d: "Cada projeto sai com documentação e testes, não só com código." },
  { t: "IA como apoio, não como atalho", d: "Uso ferramentas de IA para estudar e implementar, mas valido comportamento, testes e limitações." },
  { t: "Problemas concretos", d: "Prefiro projetos que respondem a uma pergunta real e dizem o que funcionou e o que não funcionou." },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-t`} className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-20 md:px-8">
      <h2 id={`${id}-t`} className="reveal font-display mb-10 text-3xl font-bold tracking-tight md:text-5xl">
        {title}
        <span className="text-accent">.</span>
      </h2>
      {children}
    </section>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full border border-line px-3 py-1 text-xs text-muted transition-colors group-hover:border-accent/40">
      {children}
    </li>
  );
}

function LinkPill({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-white underline-offset-4 transition-colors hover:text-accent hover:underline"
    >
      {children}
    </a>
  );
}

function ProjectCard({ p, className }: { p: Project; className?: string }) {
  return (
    <article
      className={clsx(
        "reveal group flex flex-col justify-between rounded-3xl border border-line bg-panel p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 md:p-8",
        className,
      )}
    >
      <div>
        <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{p.title}</h3>
        <p className="mt-3 max-w-prose text-muted">{p.summary}</p>
      </div>
      <div className="mt-6">
        <ul className="mb-5 flex flex-wrap gap-2" aria-label="Tecnologias">
          {p.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {p.demoUrl && (
            <LinkPill href={p.demoUrl}>
              <ExternalLink size={16} aria-hidden /> Demo <span className="sr-only">de {p.title}</span>
            </LinkPill>
          )}
          {p.repoUrl ? (
            <LinkPill href={p.repoUrl}>
              <Code2 size={16} aria-hidden /> Código <span className="sr-only">de {p.title}</span>
            </LinkPill>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-sm text-muted">
              <Lock size={14} aria-hidden /> repositório privado
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function App() {
  useReveal();

  return (
    <>
      <a href="#projetos" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-ink">
        Ir para o conteúdo
      </a>
      <header className="sticky top-0 z-40 border-b border-line/60 bg-ink/80 backdrop-blur">
        <nav aria-label="Principal" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#inicio" className="font-display text-lg font-bold">
            GP<span className="text-accent">.</span>
          </a>
          <ul className="flex gap-5 text-sm text-muted md:gap-8">
            {[
              ["Projetos", "#projetos"],
              ["Stack", "#stack"],
              ["Sobre", "#sobre"],
              ["Contato", "#contato"],
            ].map(([l, h]) => (
              <li key={h}>
                <a className="transition-colors hover:text-accent" href={h}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <section id="inicio" className="mx-auto max-w-6xl px-5 pb-12 pt-20 md:px-8 md:pt-32">
          <p className="reveal mb-6 inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-sm text-muted">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
            Aberto a estágio e vaga júnior
          </p>
          <h1 className="reveal font-display max-w-4xl text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl md:text-8xl">
            Gilson Pereira, <span className="text-accent">da farmácia</span> para o código.
          </h1>
          <p className="reveal mt-8 max-w-2xl text-lg text-muted md:text-xl">
            Farmacêutico em transição para tecnologia e graduando em Análise e Desenvolvimento de Sistemas. Construo
            aplicações web com React, TypeScript e Node.js e também atuo em suporte técnico Windows.
          </p>
          <div className="reveal mt-10 flex flex-wrap gap-4">
            <a
              href="#projetos"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-ink transition-transform hover:-translate-y-0.5"
            >
              Ver projetos <ArrowUpRight size={18} aria-hidden />
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-medium transition-colors hover:border-accent hover:text-accent"
            >
              <Github size={18} aria-hidden /> GitHub
            </a>
          </div>
        </section>

        <Section id="projetos" title="Projetos">
          <div className="grid gap-4 lg:grid-cols-6">
            {featured.map((p, i) => (
              <ProjectCard key={p.slug} p={p} className={spans[i % spans.length]} />
            ))}
          </div>
          {others.length > 0 && (
            <>
              <h3 className="reveal font-display mb-5 mt-14 text-xl font-bold text-muted">Mais projetos</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {others.map((p) => (
                  <ProjectCard key={p.slug} p={p} />
                ))}
              </div>
            </>
          )}
        </Section>

        <Section id="stack" title="Stack">
          <div className="grid gap-4 md:grid-cols-2">
            {stack.map((g) => (
              <div key={g.group} className="reveal rounded-3xl border border-line p-6">
                <h3 className="font-display mb-4 text-lg font-bold text-accent">{g.group}</h3>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <li key={i} className="rounded-full bg-panel px-3 py-1.5 text-sm">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="reveal mt-6 text-muted">
            Estudando agora: redes, Linux e cibersegurança (curso Cisco concluído) e Suporte de TI do Google (em
            andamento).
          </p>
        </Section>

        <Section id="sobre" title="Como eu trabalho">
          <ol className="grid gap-4 md:grid-cols-3">
            {principles.map((p, i) => (
              <li key={p.t} className="reveal rounded-3xl bg-panel p-6">
                <span className="font-display text-4xl font-extrabold text-accent">0{i + 1}</span>
                <h3 className="font-display mt-3 text-xl font-bold">{p.t}</h3>
                <p className="mt-2 text-muted">{p.d}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="contato" title="Vamos conversar">
          <p className="reveal mb-8 max-w-xl text-lg text-muted">
            Procuro estágio ou vaga júnior em front-end, suporte técnico ou desenvolvimento. O contato mais rápido é
            pelo LinkedIn.
          </p>
          <div className="reveal flex flex-wrap gap-4">
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-ink transition-transform hover:-translate-y-0.5"
            >
              <Linkedin size={18} aria-hidden /> LinkedIn
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-medium transition-colors hover:border-accent hover:text-accent"
            >
              <Github size={18} aria-hidden /> GitHub
            </a>
          </div>
        </Section>
      </main>

      <footer className="border-t border-line py-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} Gilson Pereira · Pernambuco, Brasil
      </footer>
    </>
  );
}
