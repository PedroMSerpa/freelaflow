export type Stage = 'Planejamento' | 'Em andamento' | 'Concluído';
export interface Task {
  id: string;
  title: string;
  done: boolean;
}
export interface Project {
  id: string;
  name: string;
  client: string;
  category: string;
  value: number;
  due: string;
  stage: Stage;
  paid: boolean;
  color: string;
  tasks: Task[];
}
export const money = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
export const progress = (project: Project) =>
  project.tasks.length
    ? Math.round((project.tasks.filter((t) => t.done).length / project.tasks.length) * 100)
    : 0;
export const stages: Stage[] = ['Planejamento', 'Em andamento', 'Concluído'];
const date = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
export function seedProjects(): Project[] {
  return [
    {
      id: '1',
      name: 'Uma nova presença digital',
      client: 'Studio Aurora',
      category: 'Website',
      value: 4800,
      due: date(4),
      stage: 'Em andamento',
      paid: false,
      color: 'purple',
      tasks: [
        { id: '11', title: 'Pesquisa e direção visual', done: true },
        { id: '12', title: 'Design das páginas', done: true },
        { id: '13', title: 'Desenvolver interface', done: false },
        { id: '14', title: 'Revisão com o cliente', done: false },
      ],
    },
    {
      id: '2',
      name: 'Identidade que conecta',
      client: 'Onda Coffee',
      category: 'Branding',
      value: 3200,
      due: date(8),
      stage: 'Em andamento',
      paid: false,
      color: 'orange',
      tasks: [
        { id: '21', title: 'Moodboard e conceito', done: true },
        { id: '22', title: 'Construção da marca', done: true },
        { id: '23', title: 'Manual de identidade', done: false },
      ],
    },
    {
      id: '3',
      name: 'Experiência sem fricção',
      client: 'Orbit Finance',
      category: 'UI/UX',
      value: 6500,
      due: date(14),
      stage: 'Planejamento',
      paid: false,
      color: 'blue',
      tasks: [
        { id: '31', title: 'Mapear jornada do usuário', done: false },
        { id: '32', title: 'Prototipar experiência', done: false },
      ],
    },
    {
      id: '4',
      name: 'Pequenos detalhes, grande impacto',
      client: 'Forma Atelier',
      category: 'Design',
      value: 2400,
      due: date(-2),
      stage: 'Concluído',
      paid: true,
      color: 'pink',
      tasks: [
        { id: '41', title: 'Criar peças da campanha', done: true },
        { id: '42', title: 'Entregar arquivos finais', done: true },
      ],
    },
  ];
}
export function isProjectList(value: unknown): value is Project[] {
  return (
    Array.isArray(value) &&
    value.every(
      (p) =>
        p &&
        typeof p.id === 'string' &&
        typeof p.name === 'string' &&
        typeof p.client === 'string' &&
        typeof p.category === 'string' &&
        typeof p.value === 'number' &&
        Number.isFinite(p.value) &&
        p.value >= 0 &&
        typeof p.due === 'string' &&
        /^\d{4}-\d{2}-\d{2}$/.test(p.due) &&
        stages.includes(p.stage) &&
        typeof p.paid === 'boolean' &&
        typeof p.color === 'string' &&
        Array.isArray(p.tasks) &&
        p.tasks.every(
          (t: Task) =>
            t &&
            typeof t.id === 'string' &&
            typeof t.title === 'string' &&
            typeof t.done === 'boolean',
        ),
    )
  );
}
