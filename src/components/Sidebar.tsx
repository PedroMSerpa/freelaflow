import { useEffect, useRef, useState } from 'react';
import {
  LayoutDashboard,
  Layers,
  CheckCheck,
  Users,
  Wallet,
  Sparkles,
  ExternalLink,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from 'lucide-react';
import ProfileMenu from './ProfileMenu';
import type { Theme } from '../lib/useTheme';
import './sidebar.css';
import LogoMark from './LogoMark';

const pages = [
  { name: 'Visão geral', icon: LayoutDashboard },
  { name: 'Projetos', icon: Layers },
  { name: 'Tarefas', icon: CheckCheck },
  { name: 'Clientes', icon: Users },
  { name: 'Financeiro', icon: Wallet },
];

interface Props {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  page: string;
  projectCount: number;
  userName: string;
  mobile: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({
  theme,
  onThemeChange,
  page,
  projectCount,
  userName,
  mobile,
  onClose,
  onNavigate,
  onLogout,
  collapsed,
  onToggle,
}: Props) {
  const panel = useRef<HTMLElement>(null);
  const [small, setSmall] = useState(() => window.matchMedia('(max-width: 700px)').matches);
  useEffect(() => {
    const content = panel.current?.querySelector<HTMLElement>('.sidebar-scroll');
    if (content) content.scrollTop = 0;
  }, [collapsed, mobile]);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 700px)');
    const update = () => {
      setSmall(query.matches);
      if (!query.matches) onClose();
    };
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, [onClose]);
  useEffect(() => {
    if (!mobile || !small) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusFrame = requestAnimationFrame(() => {
      panel.current?.querySelector<HTMLButtonElement>('.sidebar-close')?.focus();
    });
    // Visibility changes with the drawer transition; retry once it has completed.
    const focusTimer = window.setTimeout(() => {
      if (!panel.current?.contains(document.activeElement)) {
        panel.current?.querySelector<HTMLButtonElement>('.sidebar-close')?.focus();
      }
    }, 260);
    function keyboard(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (panel.current?.querySelector(':popover-open')) return;
        event.preventDefault();
        onClose();
      }
      if (event.key !== 'Tab') return;
      const items = Array.from(
        panel.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      ).filter((el) => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden');
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
    document.addEventListener('keydown', keyboard);
    return () => {
      cancelAnimationFrame(focusFrame);
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', keyboard);
      previous?.focus();
    };
  }, [mobile, small, onClose]);
  return (
    <>
      {mobile && small && (
        <button
          className="sidebar-scrim"
          aria-label="Fechar menu"
          onClick={onClose}
          tabIndex={-1}
        />
      )}
      <aside
        ref={panel}
        id="workspace-sidebar"
        className={`sidebar ${mobile ? 'open' : ''}`}
        aria-label="Menu do workspace"
        role={mobile && small ? 'dialog' : undefined}
        aria-modal={mobile && small ? true : undefined}
        inert={small && !mobile}
      >
        <div className="sidebar-header">
          <a
            className="brand"
            href="#"
            aria-label="FreelaFlow, visão geral"
            onClick={(event) => {
              event.preventDefault();
              onNavigate('Visão geral');
            }}
          >
            <LogoMark className="brand-icon" />
            <span className="sidebar-brand-text">
              freela<span className="brand-light">flow</span>
              <sup>®</sup>
            </span>
          </a>
          <button className="icon-button sidebar-close" onClick={onClose} aria-label="Fechar menu">
            <X size={19} />
          </button>
        </div>
        <div className="sidebar-controls">
          <span>SEU WORKSPACE</span>
          <button
            className="icon-button sidebar-collapse"
            onClick={onToggle}
            aria-label={collapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
            aria-expanded={!collapsed}
            aria-controls="sidebar-scroll"
            title={collapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
          >
            {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>
        <div
          className="sidebar-scroll"
          id="sidebar-scroll"
          tabIndex={0}
          role="region"
          aria-label="Navegação e informações do workspace"
        >
          <span className="nav-label">WORKSPACE</span>
          <nav aria-label="Seções do workspace">
            {pages.map(({ name, icon: Icon }) => (
              <button
                key={name}
                className={page === name ? 'nav-item active' : 'nav-item'}
                onClick={() => onNavigate(name)}
                aria-label={name}
                aria-current={page === name ? 'page' : undefined}
                title={collapsed && !small ? name : undefined}
              >
                <Icon size={18} />
                <span className="nav-text">{name}</span>
                {name === 'Projetos' && (
                  <span className="nav-count" aria-hidden="true">
                    {projectCount}
                  </span>
                )}
                {page === name && <span className="nav-dot" />}
              </button>
            ))}
          </nav>
          <div className="sidebar-bottom">
            <div className="little-note">
              <Sparkles size={20} />
              <p>
                Grandes ideias.
                <br />
                <strong>Um passo de cada vez.</strong>
              </p>
              <span>Seu próximo nível começa aqui.</span>
            </div>
            <a
              className="github-link"
              href="https://github.com/PedroMSerpa"
              target="_blank"
              rel="noreferrer"
            >
              <span>Feito por Pedro Serpa</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
        <div className="sidebar-footer">
          <div className="profile">
            <ProfileMenu
              userName={userName}
              theme={theme}
              onThemeChange={onThemeChange}
              placement="sidebar"
            />
            <div className="profile-details">
              {userName}
              <small>Freelancer & criador</small>
            </div>
            <button
              className="icon-button logout-button"
              onClick={onLogout}
              aria-label="Sair do workspace"
              title="Sair do workspace"
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
