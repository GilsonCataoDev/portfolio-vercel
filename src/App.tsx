import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import clsx from "clsx";
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

const groups: { id: Category; title: string; intro: string }[] = [
  {
    id: "web",
    title: "Aplicações web e mobile",
    intro: "Produtos com front-end, API e banco de dados, vários deles na área da saúde.",
  },
  {
    id: "automation",
    title: "Automação, dados e IA",
    intro: "Rotinas que rodam sozinhas, pipelines de dados e agentes com LLM.",
  },
  {
    id: "support",
    title: "Suporte técnico",
    intro: "Ferramentas para o dia a dia de um atendimento N1/N2.",
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

function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-t`} className="scroll-mt-12 py-10 first:pt-0 lg:scroll-mt-0">
      <h2 id={`${id}-t`} className="mb-6 font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted">
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
      <ArrowUpRight size={14} aria-hidden />
    </a>
  );
}

function ProjectRow({ p }: { p: Project }) {
  return (
    <article className="border-t border-rule py-6 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="font-serif text-xl font-semibold leading-snug">{p.title}</h4>
        <p className="flex flex-wrap gap-x-4 text-sm">
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
      </div>
      <p className="mt-2 max-w-[62ch] text-[0.95rem] text-muted">{p.summary}</p>
      <p className="mt-3 font-mono text-xs text-ink/80">{p.stack.join("  ·  ")}</p>
    </article>
  );
}

export default function App() {
  const active = useActiveSection(nav.map(([id]) => id));

  return (
    <div className="mx-auto max-w-6xl px-6 md:px-10 lg:flex lg:gap-20">
      <a
        href="#projetos"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Ir para os projetos
      </a>

      <header className="fade-in pt-16 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[22rem] lg:shrink-0 lg:flex-col lg:justify-between lg:py-20">
        <div>
          <h1 className="font-serif text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl">Gilson Pereira</h1>
          <p className="mt-3 text-lg">Desenvolvedor em formação</p>
          <p className="mt-4 max-w-xs text-muted">
            Front-end, back-end e automação. Busco estágio ou vaga júnior.
          </p>
          <p className="mt-4 font-mono text-xs text-muted">Pernambuco, Brasil</p>

          <nav aria-label="Seções" className="mt-12 hidden lg:block">
            <ul className="space-y-3 font-mono text-xs uppercase tracking-[0.14em]">
              {nav.map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? "true" : undefined}
                    className={clsx(
                      "inline-flex items-center gap-3 transition-colors hover:text-accent",
                      active === id ? "text-ink" : "text-muted",
                    )}
                  >
                    <span
                      aria-hidden
                      className={clsx("h-px bg-current transition-all", active === id ? "w-12" : "w-6")}
                    />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <ul className="mt-8 flex gap-5 lg:mt-0">
          <li>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted transition-colors hover:text-accent">
              <Github size={22} aria-hidden />
            </a>
          </li>
          <li>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted transition-colors hover:text-accent">
              <Linkedin size={22} aria-hidden />
            </a>
          </li>
        </ul>
      </header>

      <main className="fade-in pb-24 pt-12 lg:w-full lg:py-20">
        <Section id="sobre" title="Sobre">
          <div className="max-w-[62ch] space-y-4">
            <p>
              Sou farmacêutico em transição para tecnologia e graduando em Análise e Desenvolvimento de Sistemas.
              Desenvolvo aplicações web com React, TypeScript e NestJS e automações em Python e Node.js.
            </p>
            <p>
              A experiência em saúde aparece nos projetos: prontuário e agenda clínica, consulta de medicamentos para
              farmácia e sites para profissionais da área. Conheço o problema de quem usa o sistema, e isso orienta
              as decisões de produto.
            </p>
            <p className="text-muted">
              Uso ferramentas de IA como apoio de estudo e implementação. Antes de apresentar um projeto, valido o
              comportamento, os testes e as limitações.
            </p>
          </div>
        </Section>

        <Section id="projetos" title="Projetos">
          <div className="space-y-12">
            {groups.map((g) => (
              <div key={g.id}>
                <h3 className="font-serif text-2xl font-semibold">{g.title}</h3>
                <p className="mb-6 mt-1 text-sm text-muted">{g.intro}</p>
                {projects
                  .filter((p) => p.category === g.id)
                  .map((p) => (
                    <ProjectRow key={p.slug} p={p} />
                  ))}
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm text-muted">
            Alguns repositórios são privados e posso mostrá-los em conversa. Os demais projetos e estudos estão no{" "}
            <a className="link" href={GITHUB} target="_blank" rel="noopener noreferrer">
              meu GitHub
            </a>
            .
          </p>
        </Section>

        <Section id="competencias" title="Competências">
          <dl className="max-w-[62ch] divide-y divide-rule border-y border-rule">
            {skills.map(([k, v]) => (
              <div key={k} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="font-medium">{k}</dt>
                <dd className="text-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="formacao" title="Formação">
          <dl className="max-w-[62ch] divide-y divide-rule border-y border-rule">
            {education.map(([k, v]) => (
              <div key={v} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="font-mono text-xs uppercase tracking-[0.12em] text-muted sm:pt-1">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="contato" title="Contato">
          <p className="max-w-[62ch]">
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
        </Section>

        <footer className="mt-10 border-t border-rule pt-6 font-mono text-xs text-muted">
          Gilson Pereira · {new Date().getFullYear()}
        </footer>
      </main>
    </div>
  );
}
