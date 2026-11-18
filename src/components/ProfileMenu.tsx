import { useEffect, useId, useRef, useState } from 'react';
import { Check, Moon, Sun, UserRound } from 'lucide-react';
import { initials } from '../lib/session';
import type { Theme } from '../lib/useTheme';
import './profile-menu.css';

interface Props {
  userName: string;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  placement?: 'header' | 'sidebar';
}

export default function ProfileMenu({
  userName,
  theme,
  onThemeChange,
  placement = 'header',
}: Props) {
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  function positionPanel() {
    const rect = trigger.current?.getBoundingClientRect();
    if (!rect) return;
    const width = Math.min(290, window.innerWidth - 32);
    const height = panel.current?.offsetHeight || 245;
    const side = placement === 'sidebar';
    const left = side && window.innerWidth > 700 ? rect.right + 14 : rect.right - width;
    const top = side ? rect.bottom - height : rect.bottom + 12;
    setPosition({
      left: Math.max(16, Math.min(left, window.innerWidth - width - 16)),
      top: Math.max(16, Math.min(top, window.innerHeight - height - 16)),
    });
  }
  useEffect(() => {
    const close = () => panel.current?.hidePopover();
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);
  return (
    <div className={`profile-menu profile-menu-${placement}`}>
      <button
        ref={trigger}
        className={`profile-trigger ${placement === 'header' ? 'top-avatar' : 'profile-avatar'}`}
        aria-label="Abrir perfil e preferências"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={id}
        popoverTarget={id}
        onClick={positionPanel}
        title="Perfil e aparência"
      >
        {initials(userName)}
      </button>
      <div
        ref={panel}
        id={id}
        className="profile-menu-panel"
        popover="auto"
        role="dialog"
        aria-label="Perfil e aparência"
        style={position}
        onToggle={(event) => {
          const isOpen = (event.nativeEvent as ToggleEvent).newState === 'open';
          setOpen(isOpen);
          if (isOpen) {
            positionPanel();
            panel.current
              ?.querySelector<HTMLInputElement>('input:checked')
              ?.focus({ preventScroll: true });
          }
        }}
      >
        <div className="profile-menu-identity">
          <span className="profile-menu-icon">
            <UserRound size={20} />
          </span>
          <div>
            <span className="profile-menu-caption">SEU PERFIL</span>
            <strong>{userName}</strong>
          </div>
        </div>
        <fieldset className="theme-options">
          <legend>Aparência</legend>
          <div className="theme-options-grid">
            {(
              [
                { value: 'light', label: 'Tema claro', icon: Sun },
                { value: 'dark', label: 'Tema escuro', icon: Moon },
              ] as const
            ).map(({ value, label, icon: Icon }) => (
              <label className={`theme-choice ${theme === value ? 'is-selected' : ''}`} key={value}>
                <input
                  type="radio"
                  name={`theme-${id}`}
                  value={value}
                  checked={theme === value}
                  onChange={() => onThemeChange(value)}
                />
                <Icon size={19} />
                <span>{label}</span>
                {theme === value && <Check className="theme-selected-check" size={12} />}
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
}
