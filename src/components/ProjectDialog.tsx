import { useEffect, useRef, useState, type FormEvent } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { stages, type Project } from '../lib/projects';
export default function ProjectDialog({
  project,
  onSave,
  onDelete,
  onClose,
}: {
  project?: Project;
  onSave: (p: Project) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [tasks, setTasks] = useState(project?.tasks ?? []);
  const [task, setTask] = useState('');
  useEffect(() => {
    const d = ref.current;
    d?.showModal();
    return () => d?.close();
  }, []);
  function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    onSave({
      id: project?.id ?? crypto.randomUUID(),
      name: String(f.get('name')).trim(),
      client: String(f.get('client')).trim(),
      category: String(f.get('category')),
      value: Number(f.get('value')),
      due: String(f.get('due')),
      stage: f.get('stage') as Project['stage'],
      paid: project?.paid ?? false,
      color: project?.color ?? ['purple', 'orange', 'blue', 'pink'][Math.floor(Math.random() * 4)],
      tasks,
    });
  }
  return (
    <dialog
      ref={ref}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="dialog-title"
    >
      <form onSubmit={save}>
        <div className="section-heading">
          <div>
            <span className="eyebrow">SEU PRÓXIMO GRANDE TRABALHO</span>
            <h2 id="dialog-title">{project ? 'Detalhes do projeto' : 'Novo projeto'}</h2>
          </div>
          <button type="button" className="icon-button" aria-label="Fechar" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <label>
          Nome do projeto
          <input
            name="name"
            required
            maxLength={100}
            pattern=".*\S.*"
            defaultValue={project?.name}
            placeholder="O que vamos criar?"
            autoFocus
          />
        </label>
        <label>
          Cliente
          <input
            name="client"
            required
            maxLength={80}
            pattern=".*\S.*"
            defaultValue={project?.client}
            placeholder="Nome do cliente ou empresa"
          />
        </label>
        <div className="form-grid">
          <label>
            Valor (R$)
            <input
              name="value"
              type="number"
              min="0"
              max="100000000"
              step="0.01"
              required
              defaultValue={project?.value}
              placeholder="0,00"
            />
          </label>
          <label>
            Prazo
            <input name="due" type="date" required defaultValue={project?.due} />
          </label>
          <label>
            Categoria
            <select name="category" defaultValue={project?.category ?? 'Website'}>
              {['Website', 'Branding', 'UI/UX', 'Design', 'Desenvolvimento', 'Outros'].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label>
            Status
            <select name="stage" defaultValue={project?.stage ?? 'Planejamento'}>
              {stages.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>
        <label>Tarefas do projeto</label>
        <div className="task-editor">
          {tasks.map((t) => (
            <div className="task-edit" key={t.id}>
              <input
                aria-label={`Concluir ${t.title}`}
                type="checkbox"
                checked={t.done}
                onChange={() =>
                  setTasks(tasks.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))
                }
              />
              <span>{t.title}</span>
              <button
                type="button"
                className="icon-button"
                aria-label={`Excluir ${t.title}`}
                onClick={() => setTasks(tasks.filter((x) => x.id !== t.id))}
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <div className="task-add">
            <input
              aria-label="Nova tarefa"
              value={task}
              maxLength={160}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Adicionar uma etapa…"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (task.trim()) {
                    setTasks([
                      ...tasks,
                      { id: crypto.randomUUID(), title: task.trim(), done: false },
                    ]);
                    setTask('');
                  }
                }
              }}
            />
            <button
              type="button"
              className="icon-button"
              aria-label="Adicionar tarefa"
              disabled={!task.trim()}
              onClick={() => {
                setTasks([...tasks, { id: crypto.randomUUID(), title: task.trim(), done: false }]);
                setTask('');
              }}
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
        <div className="dialog-footer">
          {project && (
            <button
              className="danger"
              type="button"
              onClick={() => {
                if (window.confirm('Excluir este projeto e suas tarefas?')) onDelete(project.id);
              }}
            >
              <Trash2 size={15} />
              Excluir
            </button>
          )}
          <button type="submit" className="button primary">
            {project ? 'Salvar alterações' : 'Criar projeto'}
            <Plus size={16} />
          </button>
        </div>
      </form>
    </dialog>
  );
}
