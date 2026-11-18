import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Layers,
  Check,
  Wallet,
  ArrowLeft,
  UserRound,
  Monitor,
  Menu,
  X,
  Plus,
  Minus,
} from 'lucide-react';
import App from './App';
import FlowSculpture from './components/FlowSculpture';
import LogoMark from './components/LogoMark';
import { clearSession, readSession, saveSession, type LocalSession } from './lib/session';
import './experience.css';

function Brand() {
  return (
    <a className="ff-brand" href="#/" aria-label="FreelaFlow, início">
      <LogoMark className="ff-mark" />
      freela<span>flow</span>
      <sup>®</sup>
    </a>
  );
}
const questions = [
  {
    q: 'Para quem é o FreelaFlow?',
    a: 'Para designers, desenvolvedores e outros profissionais independentes que querem acompanhar projetos, etapas e recebimentos em um único workspace.',
  },
  {
    q: 'Preciso criar uma conta?',
    a: 'Nesta demonstração, basta informar seu nome. A entrada é local e não usa senha. Ela personaliza a experiência, mas não autentica nem protege dados.',
  },
  {
    q: 'Onde meus projetos ficam salvos?',
    a: 'No navegador deste dispositivo. Não há sincronização entre aparelhos nem separação de projetos por nome.',
  },
  {
    q: 'O aplicativo recebe pagamentos?',
    a: 'O financeiro permite registrar manualmente os valores recebidos e acompanhar o que falta receber. Ele não realiza cobranças nem transações bancárias.',
  },
];
function Landing() {
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="marketing">
      <a className="skip-link" href="#landing-main">
        Pular para conteúdo
      </a>
      <header className="marketing-nav">
        <Brand />
        <nav
          className={menu ? 'marketing-links is-open' : 'marketing-links'}
          aria-label="Navegação principal"
        >
          <a href="#recursos" onClick={() => setMenu(false)}>
            O workspace
          </a>
          <a href="#como-funciona" onClick={() => setMenu(false)}>
            Como funciona
          </a>
          <a href="#perguntas" onClick={() => setMenu(false)}>
            Perguntas
          </a>
        </nav>
        <div className="marketing-nav-actions">
          <a href="#/entrar" className="nav-login">
            Entrar
            <ArrowUpRight size={14} />
          </a>
          <a href="#/entrar" className="ff-button navy nav-start">
            Começar meu flow
            <ArrowUpRight size={15} />
          </a>
          <button
            className="marketing-menu"
            aria-label={menu ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="landing-main" className="landing-main">
        <section className="landing-hero">
          <div className="hero-editorial">
            <div className="ff-eyebrow">
              <span className="pink-dot" />
              PARA QUEM ESCOLHE CRIAR
            </div>
            <h1>
              Independente.
              <br />
              Nunca mais
              <br />
              <em>no improviso.</em>
            </h1>
            <p>
              Você cuida das grandes ideias.
              <br />
              Seu workspace cuida de conectar projetos,
              <br className="desktop-only" /> prazos e pagamentos.
            </p>
            <div className="hero-ctas">
              <a className="ff-button pink" href="#/entrar">
                Encontre seu flow
                <ArrowUpRight size={18} />
              </a>
              <a className="hero-secondary" href="#recursos">
                Explore o workspace
                <ArrowRight size={15} />
              </a>
            </div>
            <div className="hero-footnote">
              <span className="tiny-orbit">✳</span>Menos abas abertas. Mais espaço para criar.
            </div>
          </div>
          <div className="hero-art-panel">
            <FlowSculpture />
            <div className="art-caption">
              <span>IDEIA → PROCESSO → ENTREGA</span>
              <span>01 — ∞</span>
            </div>
          </div>
        </section>
        <div className="discipline-strip">
          <span>UM ESPAÇO. MUITAS POSSIBILIDADES.</span>
          <div>
            Design<span>✳</span>Desenvolvimento<span>✳</span>Branding<span>✳</span>Seu próximo
            projeto<span>↗</span>
          </div>
        </div>
        <section id="recursos" className="workspace-story">
          <div className="story-heading">
            <div>
              <span className="ff-eyebrow">01 / TUDO SE CONECTA</span>
              <h2>
                O seu trabalho tem talento.
                <br />
                <span>Agora tem estrutura.</span>
              </h2>
            </div>
            <p>
              Da primeira conversa ao último pagamento.
              <br />
              Um fluxo claro para cada etapa do seu trabalho.
            </p>
          </div>
          <div className="product-showcase">
            <div className="showcase-copy">
              <span className="feature-number">[ 01 — 03 ]</span>
              <Layers size={29} strokeWidth={1.2} />
              <h3>
                Do briefing
                <br />
                ao “ficou incrível”.
              </h3>
              <p>
                Organize cada projeto por etapa. Defina prazos, acompanhe tarefas e veja suas ideias
                saírem do papel.
              </p>
              <a className="ff-text-link" href="#/entrar">
                Conheça o seu workspace
                <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="product-preview" aria-label="Exemplo ilustrativo de projeto">
              <div className="preview-top">
                <Brand />
                <span>
                  <span className="pink-dot" />
                  WORKSPACE / DEMO
                </span>
              </div>
              <div className="preview-title">
                <div>
                  <small>PROJETO EM DESTAQUE</small>
                  <h4>Uma nova presença digital.</h4>
                </div>
                <span>↗</span>
              </div>
              <div className="preview-meta">
                <span>Studio Aurora</span>
                <span>Website</span>
                <span className="preview-badge">Em andamento</span>
              </div>
              <div className="preview-progress">
                <span>Grandes ideias, passo a passo.</span>
                <b>66%</b>
              </div>
              <div className="preview-track">
                <span />
              </div>
              <div className="preview-tasks">
                <span>
                  <i>
                    <Check size={12} />
                  </i>
                  Pesquisa & direção criativa
                </span>
                <span>
                  <i>
                    <Check size={12} />
                  </i>
                  Design da experiência
                </span>
                <span>
                  <i />
                  Dar vida à interface<small>PRÓXIMO PASSO</small>
                </span>
              </div>
              <div className="preview-bottom">
                <span>UM BOM PROCESSO FAZ DIFERENÇA.</span>
                <span>✳</span>
              </div>
            </div>
          </div>
          <div className="feature-duo">
            <article>
              <span className="feature-number">[ 02 / CLAREZA ]</span>
              <h3>
                Cada entrega,
                <br />
                um passo à frente.
              </h3>
              <p>
                Checklists, progresso e projetos por etapa. Saiba onde concentrar sua energia, sem
                perder o todo de vista.
              </p>
              <div className="mini-stages">
                <span>
                  <i />
                  Planejar
                </span>
                <ArrowRight size={16} />
                <span>
                  <i />
                  Criar
                </span>
                <ArrowRight size={16} />
                <span>
                  <Check size={12} />
                  Entregar
                </span>
              </div>
            </article>
            <article>
              <span className="feature-number">[ 03 / TRANQUILIDADE ]</span>
              <h3>
                Seu trabalho tem valor.
                <br />
                Acompanhe cada parte.
              </h3>
              <p>
                Registre recebimentos, acompanhe valores pendentes e conecte o financeiro aos
                projetos que você cria.
              </p>
              <div className="mini-payment">
                <Wallet size={23} />
                <span>
                  Recebimento registrado<small>Exemplo ilustrativo · Studio Aurora</small>
                </span>
                <span className="mini-check">
                  <Check size={15} />
                </span>
              </div>
            </article>
          </div>
        </section>
        <section className="process-section" id="como-funciona">
          <div className="process-intro">
            <span className="ff-eyebrow">02 / ENTRE NO RITMO</span>
            <h2>
              Seu próximo nível.
              <br />
              Sem complicar
              <br />
              <em>o primeiro passo.</em>
            </h2>
            <a href="#/entrar" className="ff-button pink">
              Experimentar agora
              <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="process-steps">
            {[
              {
                title: 'Entre no seu espaço.',
                text: 'Informe seu nome para explorar a demonstração. Sem cadastro e sem senha.',
              },
              {
                title: 'Tire uma ideia do papel.',
                text: 'Cadastre um projeto, defina o prazo e divida o trabalho em tarefas que fazem sentido.',
              },
              {
                title: 'Encontre o seu ritmo.',
                text: 'Atualize etapas, conclua tarefas e registre os pagamentos. Tudo se conecta no seu painel.',
              },
            ].map((s, i) => (
              <article key={s.title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
                <ArrowUpRight size={20} />
              </article>
            ))}
          </div>
        </section>
        <section className="faq-section" id="perguntas">
          <div>
            <span className="ff-eyebrow">03 / SEM PONTAS SOLTAS</span>
            <h2>
              Bom saber
              <br />
              antes de começar.
            </h2>
          </div>
          <div className="faq-list">
            {questions.map((item, i) => (
              <article key={item.q}>
                <h3>
                  <button
                    aria-expanded={open === i}
                    aria-controls={`faq-answer-${i}`}
                    onClick={() => setOpen(open === i ? null : i)}
                  >
                    {item.q}
                    {open === i ? <Minus size={17} /> : <Plus size={17} />}
                  </button>
                </h3>
                <div id={`faq-answer-${i}`} hidden={open !== i}>
                  <p>{item.a}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="closing-cta">
          <span className="ff-eyebrow">O SEU TALENTO MERECE ESSE ESPAÇO.</span>
          <h2>
            Faça acontecer.
            <br />
            <em>Do seu jeito.</em>
          </h2>
          <a href="#/entrar" className="ff-button navy">
            Começar meu flow
            <ArrowUpRight size={18} />
          </a>
          <span className="closing-star" aria-hidden="true">
            ✳
          </span>
        </section>
      </main>
      <footer className="marketing-footer">
        <Brand />
        <p>Feito para quem faz acontecer.</p>
        <a href="https://github.com/PedroMSerpa/freelaflow" target="_blank" rel="noreferrer">
          Um projeto de Pedro Serpa
          <ArrowUpRight size={14} />
        </a>
        <span>© {new Date().getFullYear()} FREELAFLOW</span>
      </footer>
    </div>
  );
}
function Entry({ onEnter }: { onEnter: (session: LocalSession) => void }) {
  const [name, setName] = useState('');
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name.trim()) onEnter({ name: name.trim() });
  }
  return (
    <div className="entry-page">
      <aside className="entry-art">
        <Brand />
        <div className="entry-art-copy">
          <span className="ff-eyebrow">BEM-VINDO AO SEU PRÓXIMO NÍVEL.</span>
          <h1>
            O talento é seu.
            <br />O espaço,
            <br />
            <em>também.</em>
          </h1>
          <p>
            Um pouco mais de estrutura.
            <br />
            Muito mais liberdade para criar.
          </p>
        </div>
        <FlowSculpture compact />
        <span className="entry-art-footer">INDEPENDENT WORK. CONNECTED FLOW. ↗</span>
      </aside>
      <main className="entry-main">
        <a className="back-home" href="#/">
          <ArrowLeft size={15} />
          Voltar ao início
        </a>
        <div className="entry-form-wrap">
          <div className="entry-mobile-brand">
            <Brand />
          </div>
          <span className="entry-label">
            <span className="pink-dot" />
            SEU WORKSPACE ESPERA POR VOCÊ
          </span>
          <h2>
            Entre no seu flow<span>.</span>
          </h2>
          <p>
            Grandes ideias precisam de espaço.
            <br />
            Vamos começar pelo seu nome?
          </p>
          <form onSubmit={submit}>
            <label htmlFor="entry-name">Como podemos chamar você?</label>
            <div className="entry-input">
              <UserRound size={18} />
              <input
                id="entry-name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                required
                maxLength={60}
                pattern=".*\S.*"
                aria-describedby="entry-explanation"
                autoFocus
              />
            </div>
            <button className="ff-button navy" type="submit" disabled={!name.trim()}>
              Entrar no workspace
              <ArrowUpRight size={18} />
            </button>
          </form>
          <div className="entry-divider">
            <span />
            ou conheça primeiro
            <span />
          </div>
          <button className="demo-button" onClick={() => onEnter({ name: 'Visitante' })}>
            <Monitor size={17} />
            Explorar demonstração
            <ArrowRight size={16} />
          </button>
          <div className="entry-disclosure" id="entry-explanation">
            <span>✳</span>
            <p>
              <strong>Um espaço de demonstração.</strong> Entrada local, sem senha. Os projetos
              ficam neste navegador e são compartilhados entre os nomes usados aqui. Esta entrada
              não autentica contas.
            </p>
          </div>
        </div>
        <footer className="entry-footer">
          <span>SEU TRABALHO. SEU RITMO.</span>
          <span>FREELAFLOW © {new Date().getFullYear()}</span>
        </footer>
      </main>
    </div>
  );
}
function routeFromHash() {
  const route = window.location.hash;
  return route === '#/app' ? 'app' : route === '#/entrar' ? 'entry' : 'landing';
}
export default function Experience() {
  const [route, setRoute] = useState(routeFromHash);
  const [session, setSession] = useState<LocalSession | null>(readSession);
  useEffect(() => {
    function update() {
      setRoute(routeFromHash());
      if (window.location.hash.startsWith('#/')) window.scrollTo(0, 0);
    }
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  useEffect(() => {
    document.title =
      route === 'app' && session
        ? 'Workspace — FreelaFlow'
        : route === 'entry'
          ? 'Entre no seu flow — FreelaFlow'
          : 'FreelaFlow — Independente. Nunca mais no improviso.';
  }, [route, session]);
  useEffect(() => {
    if (route === 'app' && !session && window.location.hash === '#/app') {
      window.location.hash = '/entrar';
    }
  }, [route, session]);
  function enter(value: LocalSession) {
    saveSession(value);
    setSession(value);
    setRoute('app');
    window.location.hash = '/app';
  }
  function leave() {
    clearSession();
    setSession(null);
    setRoute('landing');
    window.location.hash = '/';
  }
  if (route === 'app' && session) return <App userName={session.name} onLogout={leave} />;
  if (route === 'entry' || route === 'app') return <Entry onEnter={enter} />;
  return <Landing />;
}
