import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Plus,
  Layers,
  CheckCheck,
  Wallet,
  Search,
  Command,
  ArrowDownLeft,
  CalendarDays,
  Download,
  Menu,
  X,
  Circle,
  CheckCircle2,
  LogOut,
} from 'lucide-react';
import { initials } from './lib/session';
import ProjectDialog from './components/ProjectDialog';
import Sidebar from './components/Sidebar';
import LogoMark from './components/LogoMark';
import { isProjectList, money, progress, seedProjects, stages, type Project } from './lib/projects';
const storageKey = 'freelaflow:projects:v1';
function load() {
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      const data: unknown = JSON.parse(raw);
      if (isProjectList(data)) return data;
    }
  } catch {
    /* Use the demo if saved data cannot be read. */
  }
  return seedProjects();
}
function dateLabel(date: string) {
  return new Date(date + 'T12:00:00')
    .toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
    .replace('.', '');
}
export default function App({ userName, onLogout }: { userName: string; onLogout: () => void }) {
  const avatar = initials(userName);
  const [projects, setProjects] = useState<Project[]>(load);
  const [page, setPage] = useState('Visão geral');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Todos');
  const [dialog, setDialog] = useState<Project | 'new' | null>(null);
  const [toast, setToast] = useState('');
  const [mobile, setMobile] = useState(false);
  const closeSidebar = useCallback(() => setMobile(false), []);
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem('freelaflow:sidebar-collapsed') === 'true';
    } catch {
      return false;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem('freelaflow:sidebar-collapsed', String(collapsed));
    } catch {
      /* Preference remains available for this session. */
    }
  }, [collapsed]);
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(projects));
    } catch {
      setToast('Não foi possível salvar neste navegador. Exporte seus dados.');
    }
  }, [projects]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 4500);
    return () => clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    function shortcut(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector<HTMLInputElement>('#search')?.focus();
      }
    }
    window.addEventListener('keydown', shortcut);
    return () => window.removeEventListener('keydown', shortcut);
  }, []);
  const visible = useMemo(
    () =>
      projects.filter(
        (p) =>
          `${p.name} ${p.client}`.toLocaleLowerCase().includes(search.toLocaleLowerCase()) &&
          (filter === 'Todos' || p.stage === filter),
      ),
    [projects, search, filter],
  );
  const active = projects.filter((p) => p.stage !== 'Concluído');
  const received = projects.filter((p) => p.paid).reduce((a, p) => a + p.value, 0);
  const pending = projects.filter((p) => !p.paid).reduce((a, p) => a + p.value, 0);
  const tasks = projects.flatMap((p) => p.tasks.map((t) => ({ ...t, project: p })));
  function navigate(name: string) {
    setPage(name);
    setFilter('Todos');
    setMobile(false);
  }
  function toggleTask(projectId: string, taskId: string) {
    setProjects((ps) =>
      ps.map((p) =>
        p.id === projectId
          ? { ...p, tasks: p.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)) }
          : p,
      ),
    );
  }
  function exportData() {
    const blob = new Blob(
      [JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), projects }, null, 2)],
      { type: 'application/json' },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'freelaflow-backup.json';
    a.click();
    URL.revokeObjectURL(url);
    setToast('Backup exportado. Seus dados, com você.');
  }
  function card(p: Project) {
    return (
      <button className={`project-card ${p.color}`} key={p.id} onClick={() => setDialog(p)}>
        <div className="card-top">
          <span className={`project-symbol ${p.color}`}>
            {p.client.slice(0, 1)}
            <span>✦</span>
          </span>
          <span className={`badge ${p.stage === 'Concluído' ? 'complete' : ''}`}>
            <i />
            {p.stage}
          </span>
          <ArrowUpRight className="card-arrow" size={18} />
        </div>
        <span className="client-label">
          {p.client} <span> / {p.category}</span>
        </span>
        <h3>{p.name}</h3>
        <div className="project-progress">
          <span>Progresso</span>
          <b>{progress(p)}%</b>
        </div>
        <div className="progress-track">
          <div style={{ width: progress(p) + '%' }} />
        </div>
        <div className="card-bottom">
          <span>
            <CalendarDays size={13} />
            {dateLabel(p.due)}
          </span>
          <b>{money(p.value)}</b>
        </div>
      </button>
    );
  }
  const clients = [...new Set(projects.map((p) => p.client))].filter((c) =>
    c.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className={`app ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <a href="#main" className="skip-link">
        Pular para conteúdo
      </a>
      <Sidebar
        page={page}
        projectCount={active.length}
        userName={userName}
        mobile={mobile}
        onClose={closeSidebar}
        onNavigate={navigate}
        onLogout={onLogout}
        collapsed={collapsed}
        onToggle={() => setCollapsed((value) => !value)}
      />
      <div className="main-wrap">
        <header className="topbar">
          <div className="breadcrumb">
            <button
              className="mobile-menu icon-button"
              aria-label="Abrir menu"
              aria-controls="workspace-sidebar"
              aria-expanded={mobile}
              onClick={() => setMobile(true)}
            >
              <Menu size={20} />
            </button>
            <span>Workspace</span>
            <span className="slash">/</span>
            <strong>{page}</strong>
          </div>
          <div className="top-actions">
            <span className="local-status">
              <i />
              Salvo neste navegador
            </span>
            <button
              className="icon-button"
              aria-label="Exportar backup dos projetos"
              onClick={exportData}
            >
              <Download size={17} />
            </button>
            <span className="top-avatar">{avatar}</span>
            <button
              className="icon-button"
              onClick={onLogout}
              aria-label="Sair do workspace"
              title="Sair"
            >
              <LogOut size={17} />
            </button>
          </div>
        </header>
        <main id="main">
          <div className="page-heading">
            <div>
              <div className="eyebrow">
                <span className="lime-dot" />
                SEU TRABALHO. SEU RITMO.
              </div>
              <h1>
                {page === 'Visão geral' ? (
                  <>
                    Menos caos.
                    <br className="mobile-break" /> <span>Mais flow.</span>
                  </>
                ) : (
                  page
                )}
              </h1>
              <p>
                {page === 'Visão geral'
                  ? 'Tudo o que você precisa para fazer seu próximo grande trabalho.'
                  : (
                      {
                        Projetos: 'Da primeira ideia à última entrega. Tudo no lugar.',
                        Tarefas: 'Um passo de cada vez, até a próxima entrega.',
                        Clientes: 'Boas relações são o começo de grandes projetos.',
                        Financeiro: 'Clareza para criar. Tranquilidade para crescer.',
                      } as Record<string, string>
                    )[page]}
              </p>
            </div>
            <button className="button primary" onClick={() => setDialog('new')}>
              <Plus size={17} />
              Novo projeto
            </button>
          </div>
          {page === 'Visão geral' && (
            <>
              <section className="hero-banner">
                <div className="hero-content">
                  <span className="hero-kicker">
                    <span />
                    SEU ESTÚDIO INDEPENDENTE
                  </span>
                  <h2>
                    Você cria.
                    <br />O resto, a gente organiza<span>✳</span>
                  </h2>
                  <p>
                    Projetos, prazos e pagamentos.
                    <br />
                    Mais espaço para o que você faz de melhor.
                  </p>
                  <button onClick={() => navigate('Projetos')}>
                    Entrar no meu flow
                    <ArrowUpRight size={17} />
                  </button>
                </div>
                <div className="orbit-art" aria-hidden="true">
                  <div className="orbit orbit-one" />
                  <div className="orbit orbit-two" />
                  <div className="orbit orbit-three" />
                  <div className="orbit-center">
                    <LogoMark />
                  </div>
                  <div className="floating-label label-one">
                    <CheckCircle2 size={15} />
                    Ideia em movimento
                  </div>
                  <div className="floating-label label-two">
                    <span>✦</span> Criar. Entregar. Evoluir.
                  </div>
                  <span className="art-star">✳</span>
                  <span className="art-dot" />
                </div>
                <span className="hero-index">FLOW STATE — 001</span>
              </section>
              <section className="stats-grid" aria-label="Resumo do workspace">
                {[
                  {
                    label: 'Projetos em andamento',
                    value: String(active.length).padStart(2, '0'),
                    icon: Layers,
                    note: 'Ideias ganhando vida',
                    className: '',
                  },
                  {
                    label: 'Total recebido',
                    value: money(received),
                    icon: ArrowDownLeft,
                    note: 'Pagamentos registrados',
                    className: 'green',
                  },
                  {
                    label: 'A receber',
                    value: money(pending),
                    icon: Wallet,
                    note: 'Seu trabalho tem valor',
                    className: '',
                  },
                  {
                    label: 'Tarefas concluídas',
                    value: `${tasks.filter((t) => t.done).length}/${tasks.length}`,
                    icon: CheckCheck,
                    note: 'Cada passo conta',
                    className: '',
                  },
                ].map(({ label, value, icon: Icon, note, className }) => (
                  <article className="stat" key={label}>
                    <div>
                      {label}
                      <Icon size={16} />
                    </div>
                    <strong className={className}>{value}</strong>
                    <small>
                      <span className="stat-dot" />
                      {note}
                    </small>
                  </article>
                ))}
              </section>
            </>
          )}
          {(page === 'Projetos' || page === 'Visão geral') && (
            <section className="projects-section">
              <div className="section-heading">
                <div className="inline-heading">
                  <h2>{page === 'Visão geral' ? 'No seu radar' : 'Seus projetos'}</h2>
                  <span className="count">
                    {page === 'Visão geral' ? active.length : visible.length}
                  </span>
                </div>
                {page === 'Visão geral' ? (
                  <button className="text-button" onClick={() => navigate('Projetos')}>
                    Todos os projetos
                    <ArrowRight size={15} />
                  </button>
                ) : null}
              </div>
              <div className="project-toolbar">
                <div className="tabs">
                  {['Todos', ...stages].map((s) => (
                    <button
                      key={s}
                      className={filter === s ? 'selected' : ''}
                      onClick={() => setFilter(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <label className="search">
                  <Search size={15} />
                  <input
                    id="search"
                    placeholder="Buscar projetos ou clientes"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <kbd>
                    <Command size={11} /> K
                  </kbd>
                </label>
              </div>
              <div className="project-grid">
                {(page === 'Visão geral'
                  ? visible.filter((p) => p.stage !== 'Concluído')
                  : visible
                ).map(card)}
              </div>
              {(page === 'Visão geral' ? visible.filter((p) => p.stage !== 'Concluído') : visible)
                .length === 0 && (
                <div className="empty-state">
                  <Layers size={28} />
                  <h3>Nenhum projeto por aqui</h3>
                  <p>Tente outro filtro ou dê vida a uma nova ideia.</p>
                  <button className="button secondary" onClick={() => setDialog('new')}>
                    Criar projeto
                    <Plus size={15} />
                  </button>
                </div>
              )}
            </section>
          )}
          {page === 'Visão geral' && (
            <section className="bottom-grid">
              <div className="panel">
                <div className="section-heading">
                  <h2>Próximos passos</h2>
                  <button className="text-button" onClick={() => navigate('Tarefas')}>
                    Ver tarefas
                    <ArrowUpRight size={15} />
                  </button>
                </div>
                {tasks
                  .filter((t) => !t.done && t.project.stage !== 'Concluído')
                  .slice(0, 3)
                  .map((t) => (
                    <div className="task-row" key={t.id}>
                      <button
                        className="task-toggle"
                        aria-label={`Concluir ${t.title}`}
                        onClick={() => toggleTask(t.project.id, t.id)}
                      >
                        <Circle size={19} />
                      </button>
                      <div>
                        <strong>{t.title}</strong>
                        <small>{t.project.client}</small>
                      </div>
                      <span className="task-date">{dateLabel(t.project.due)}</span>
                    </div>
                  ))}
                {!tasks.some((t) => !t.done && t.project.stage !== 'Concluído') && (
                  <p className="muted">Tudo em dia. Espaço livre para a próxima ideia.</p>
                )}
              </div>
              <div className="focus-card">
                <span className="eyebrow">LEMBRETE PARA O SEU DIA</span>
                <span className="focus-star">✳</span>
                <h3>
                  O seu talento merece
                  <br />
                  uma rotina mais leve.
                </h3>
                <p>
                  Organize o trabalho.
                  <br />
                  Preserve a sua criatividade.
                </p>
                <span className="focus-footer">
                  KEEP YOUR FLOW <ArrowUpRight size={18} />
                </span>
              </div>
            </section>
          )}
          {page === 'Tarefas' && (
            <>
              <label className="search standalone-search">
                <Search size={16} />
                <input
                  id="search"
                  placeholder="Buscar projetos ou clientes"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>
              <section className="kanban">
                {stages.map((stage) => (
                  <div className="kanban-column" key={stage}>
                    <div className="section-heading">
                      <h2>
                        <i className={`stage-dot stage-${stages.indexOf(stage)}`} />
                        {stage}
                      </h2>
                      <span className="count">
                        {visible.filter((p) => p.stage === stage).length}
                      </span>
                    </div>
                    {visible
                      .filter((p) => p.stage === stage)
                      .map((p) => (
                        <article className="kanban-card" key={p.id}>
                          <span className="client-label">{p.client}</span>
                          <button className="kanban-title" onClick={() => setDialog(p)}>
                            {p.name}
                            <ArrowUpRight size={15} />
                          </button>
                          {p.tasks.map((t) => (
                            <label className={`check-task ${t.done ? 'done' : ''}`} key={t.id}>
                              <input
                                type="checkbox"
                                checked={t.done}
                                onChange={() => toggleTask(p.id, t.id)}
                              />
                              <span>{t.title}</span>
                            </label>
                          ))}
                          {p.tasks.length === 0 && (
                            <p className="muted">Abra o projeto para adicionar tarefas.</p>
                          )}
                          <label className="move-stage">
                            Mover para
                            <select
                              aria-label={`Status de ${p.name}`}
                              value={p.stage}
                              onChange={(e) =>
                                setProjects((ps) =>
                                  ps.map((x) =>
                                    x.id === p.id
                                      ? { ...x, stage: e.target.value as Project['stage'] }
                                      : x,
                                  ),
                                )
                              }
                            >
                              {stages.map((s) => (
                                <option key={s}>{s}</option>
                              ))}
                            </select>
                          </label>
                        </article>
                      ))}
                    {!visible.some((p) => p.stage === stage) && (
                      <p className="muted">Nenhum projeto nesta etapa.</p>
                    )}
                  </div>
                ))}
              </section>
            </>
          )}
          {page === 'Clientes' && (
            <>
              <label className="search standalone-search">
                <Search size={16} />
                <input
                  id="search"
                  placeholder="Buscar clientes"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>
              <section className="client-grid">
                {clients.map((client) => {
                  const list = projects.filter((p) => p.client === client);
                  return (
                    <article className="client-card" key={client}>
                      <span className={`project-symbol ${list[0].color}`}>{client[0]}</span>
                      <h2>{client}</h2>
                      <p>
                        {list.length} {list.length === 1 ? 'projeto' : 'projetos'} no workspace
                      </p>
                      <div>
                        <span>Valor contratado</span>
                        <strong>{money(list.reduce((a, p) => a + p.value, 0))}</strong>
                      </div>
                      <button
                        className="text-button"
                        onClick={() => {
                          navigate('Projetos');
                          setSearch(client);
                        }}
                      >
                        Ver projetos
                        <ArrowUpRight size={16} />
                      </button>
                    </article>
                  );
                })}
              </section>
              {!clients.length && (
                <div className="empty-state">
                  Nenhum cliente encontrado. Cadastre um projeto para começar.
                </div>
              )}
            </>
          )}
          {page === 'Financeiro' && (
            <>
              <section className="finance-summary">
                <article>
                  <span>Valor total contratado</span>
                  <strong>{money(received + pending)}</strong>
                </article>
                <article>
                  <span>Total recebido</span>
                  <strong className="green">{money(received)}</strong>
                </article>
                <article>
                  <span>A receber</span>
                  <strong>{money(pending)}</strong>
                </article>
              </section>
              <section className="panel finance-panel">
                <div className="section-heading">
                  <h2>Recebimentos por projeto</h2>
                  <span className="badge">Controle manual</span>
                </div>
                <p className="muted">
                  Registre os pagamentos recebidos. Os indicadores são atualizados automaticamente.
                </p>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Projeto / Cliente</th>
                        <th>Prazo</th>
                        <th>Valor</th>
                        <th>Pagamento</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((p) => (
                        <tr key={p.id}>
                          <td>
                            <strong>{p.name}</strong>
                            <small>{p.client}</small>
                          </td>
                          <td>{dateLabel(p.due)}</td>
                          <td>{money(p.value)}</td>
                          <td>
                            <button
                              className={p.paid ? 'payment paid' : 'payment'}
                              onClick={() => {
                                setProjects((ps) =>
                                  ps.map((x) => (x.id === p.id ? { ...x, paid: !x.paid } : x)),
                                );
                                setToast(
                                  p.paid
                                    ? 'Pagamento marcado como pendente.'
                                    : 'Recebimento registrado!',
                                );
                              }}
                            >
                              {p.paid ? (
                                <>
                                  <CheckCircle2 size={14} />
                                  Recebido
                                </>
                              ) : (
                                <>
                                  Registrar recebimento
                                  <ArrowDownLeft size={14} />
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {!projects.length && (
                  <p className="empty-state">
                    Crie seu primeiro projeto para acompanhar os recebimentos.
                  </p>
                )}
              </section>
            </>
          )}
          <footer className="main-footer">
            <span>Feito para quem faz acontecer.</span>
            <span>
              FREELAFLOW <span className="footer-star">✳</span> {new Date().getFullYear()}
            </span>
          </footer>
        </main>
      </div>
      {dialog && (
        <ProjectDialog
          project={dialog === 'new' ? undefined : dialog}
          onClose={() => setDialog(null)}
          onSave={(p) => {
            setProjects((ps) =>
              ps.some((x) => x.id === p.id) ? ps.map((x) => (x.id === p.id ? p : x)) : [...ps, p],
            );
            setDialog(null);
            setToast('Projeto salvo. Vamos fazer acontecer.');
          }}
          onDelete={(id) => {
            setProjects((ps) => ps.filter((p) => p.id !== id));
            setDialog(null);
            setToast('Projeto excluído.');
          }}
        />
      )}
      {toast && (
        <div className="toast" role="status">
          <CheckCircle2 size={17} />
          {toast}
          <button
            className="icon-button"
            aria-label="Dispensar mensagem"
            onClick={() => setToast('')}
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
