import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  Bot,
  Compass,
  Github,
  Globe,
  Linkedin,
  Lock,
  Wrench,
  type LucideIcon,
} from "lucide-react";
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

const sheet: [string, string][] = [
  ["Origem", "Pernambuco, Brasil"],
  ["Função", "Desenvolvedor em formação"],
  ["Foco", "Front-end, back-end e automação"],
  ["Procura", "Estágio ou vaga júnior"],
  ["Estudando", "Redes, Linux e cibersegurança"],
  ["Fã de", "Anime, principalmente One Piece"],
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

function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.2, 0.6, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

function useScrollState() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setShowTop(window.scrollY > 700);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return { progress, showTop };
}

/** Entrada suave ao rolar. Conteúdo já visível na carga não é escondido. */
function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"visible" | "hidden">("visible");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setState("hidden");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setState("visible");
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={clsx("reveal", state === "hidden" && "reveal-hidden", className)}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
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
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="link inline-flex min-h-11 items-center gap-1 pr-1"
    >
      {children}
      <ArrowUpRight size={15} aria-hidden />
    </a>
  );
}

function statusOf(p: Project) {
  if (p.demoUrl) return "No ar";
  if (p.repoUrl) return "Código aberto";
  return "Privado";
}

function Poster({ p, Icon }: { p: Project; Icon: LucideIcon }) {
  return (
    <article className="poster flex h-full flex-col p-5">
      <span className="stamp" aria-label={`Status: ${statusOf(p)}`}>
        {statusOf(p)}
      </span>
      <p className="text-center font-display text-sm uppercase tracking-[0.3em] text-red" aria-hidden>
        Procurado
      </p>
      <div className="portrait mx-auto my-3" aria-hidden>
        <Icon size={28} strokeWidth={2.2} />
      </div>
      <h4 className="text-center font-display text-3xl leading-tight">{p.title}</h4>
      <p className="mt-3 flex-1 text-[0.98rem] leading-snug">{p.summary}</p>
      <p className="mt-4 border-t-2 border-dashed border-ink/40 pt-3 font-mono text-xs leading-relaxed text-muted">
        <span className="font-semibold text-ink">Tripulação:</span> {p.stack.join(" · ")}
      </p>
      <p className="mt-1 flex flex-wrap gap-x-4 text-sm">
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
          <span className="inline-flex min-h-11 items-center gap-1.5 text-muted">
            <Lock size={14} aria-hidden /> Código privado
          </span>
        )}
      </p>
    </article>
  );
}

function Tags({ text }: { text: string }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {text.split(", ").map((t) => (
        <li key={t} className="tag">
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const active = useActiveSection(nav.map(([id]) => id));
  const { progress, showTop } = useScrollState();

  return (
    <>
      <a
        href="#projetos"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Ir para os projetos
      </a>

      <header className="sticky top-0 z-40 bg-paper">
        <div className="h-1 bg-ink/15" aria-hidden>
          <div className="h-full origin-left bg-red" style={{ transform: `scaleX(${progress})` }} />
        </div>
        <nav aria-label="Principal" className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 md:px-8">
          <a href="#inicio" className="flex min-h-11 shrink-0 items-center gap-2 font-display text-2xl">
            <Compass size={22} aria-label="Início" /> <span className="hidden sm:inline">GP</span>
          </a>
          <ul className="no-scrollbar flex gap-0 overflow-x-auto whitespace-nowrap text-[0.8rem] font-bold sm:gap-1 sm:text-sm md:gap-3 md:text-base">
            {nav.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={clsx(
                    "inline-flex min-h-11 items-center border-b-[3px] px-1 transition-colors hover:text-red sm:px-2 md:px-3",
                    active === id ? "border-red" : "border-transparent",
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="frevo" aria-hidden />
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-16 md:px-8">
        <section id="inicio" className="fade-in pt-10 md:pt-16">
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
            <div className="burst mx-auto grid place-items-center" aria-hidden>
              <StrawHat className="sail w-44 md:w-60" />
            </div>
          </div>
        </section>

        <div className="waves mt-10" aria-hidden />

        <Chapter n={1} id="sobre" title="Sobre">
          <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-14">
            <div className="max-w-[64ch] space-y-4">
              <p>
                Sou farmacêutico em transição para tecnologia e graduando em Análise e Desenvolvimento de Sistemas.
                Desenvolvo aplicações web com React, TypeScript e NestJS e automações em Python e Node.js.
              </p>
              <p>
                A experiência em saúde aparece nos projetos: prontuário e agenda clínica, consulta de medicamentos
                para farmácia e sites para profissionais da área. Conheço o problema de quem usa o sistema, e isso
                orienta as decisões de produto.
              </p>
              <p>
                Uso ferramentas de IA como apoio de estudo e implementação. Antes de apresentar um projeto, valido o
                comportamento, os testes e as limitações.
              </p>
              <p className="text-muted">
                Sou de Pernambuco e fã de anime, principalmente de One Piece, que inspirou o visual deste site.
              </p>
            </div>
            <aside aria-label="Ficha resumida" className="panel h-fit bg-poster lg:-rotate-1">
              <p className="border-b-[3px] border-ink bg-ink px-5 py-2 font-display text-lg uppercase tracking-[0.2em] text-paper">
                Ficha do tripulante
              </p>
              <dl className="divide-y-2 divide-ink/20 px-5">
                {sheet.map(([k, v]) => (
                  <div key={k} className="py-3">
                    <dt className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.16em] text-red">{k}</dt>
                    <dd className="font-bold">{v}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </Chapter>

        <Chapter n={2} id="projetos" title="Projetos">
          <div className="space-y-14">
            {groups.map((g) => {
              const list = projects.filter((p) => p.category === g.id);
              return (
                <div key={g.id}>
                  <h3 className="font-display text-2xl md:text-3xl">
                    <span className="mr-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-red">
                      {g.island}
                    </span>
                    {g.title}
                    <span className="ml-3 font-mono text-xs font-medium text-muted">
                      {list.length} {list.length === 1 ? "projeto" : "projetos"}
                    </span>
                  </h3>
                  <p className="mb-6 mt-1 text-muted">{g.intro}</p>
                  <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                    {list.map((p, i) => (
                      <Reveal key={p.slug} delay={(i % 3) * 90} className="poster-slot">
                        <Poster p={p} Icon={g.icon} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              );
            })}
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
          <dl className="panel max-w-4xl divide-y-2 divide-ink/20 bg-poster">
            {skills.map(([k, v]) => (
              <div key={k} className="grid gap-2 px-5 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="font-bold sm:pt-1">{k}</dt>
                <dd>
                  <Tags text={v} />
                </dd>
              </div>
            ))}
          </dl>
        </Chapter>

        <Chapter n={4} id="formacao" title="Formação">
          <dl className="panel max-w-4xl divide-y-2 divide-ink/20 bg-poster">
            {education.map(([k, v]) => (
              <div key={v} className="grid gap-1 px-5 py-3 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-red sm:pt-1.5">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </Chapter>

        <Chapter n={5} id="contato" title="Contato">
          <div className="panel relative overflow-hidden bg-poster p-6 md:p-10">
            <p className="font-display text-3xl md:text-4xl">Pronto para zarpar.</p>
            <p className="mt-3 max-w-[56ch]">
              Estou procurando estágio ou vaga júnior em front-end, suporte técnico ou desenvolvimento. O contato mais
              rápido é pelo LinkedIn, e o meu código está no GitHub.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="btn bg-red text-paper">
                <Linkedin size={18} aria-hidden /> LinkedIn
              </a>
              <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="btn bg-paper">
                <Github size={18} aria-hidden /> GitHub
              </a>
            </div>
          </div>
        </Chapter>
      </main>

      <footer>
        <div className="waves" aria-hidden />
        <div className="frevo" aria-hidden />
        <p className="py-6 text-center font-mono text-xs text-muted">
          Gilson Pereira · feito em Pernambuco · {new Date().getFullYear()}
        </p>
      </footer>

      <a
        href="#inicio"
        aria-label="Voltar ao topo"
        className={clsx(
          "btn fixed bottom-5 right-5 z-40 bg-straw px-3 transition-opacity",
          showTop ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        tabIndex={showTop ? 0 : -1}
      >
        <ArrowUp size={20} aria-hidden />
      </a>
    </>
  );
}
