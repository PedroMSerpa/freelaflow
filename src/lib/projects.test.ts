import { describe, expect, it } from 'vitest';
import { isProjectList, money, progress, seedProjects } from './projects';
describe('project data', () => {
  it('accepts demo data and rejects corrupt saved data', () => {
    expect(isProjectList(seedProjects())).toBe(true);
    expect(isProjectList(null)).toBe(false);
    expect(isProjectList([{ name: 'broken' }])).toBe(false);
    const [p] = seedProjects();
    expect(isProjectList([{ ...p, value: -1 }])).toBe(false);
    expect(isProjectList([{ ...p, tasks: [{ id: '1', title: 'Task', done: 'yes' }] }])).toBe(false);
  });
  it('calculates progress from completed tasks and handles an empty project', () => {
    const [p] = seedProjects();
    expect(progress(p)).toBe(50);
    expect(progress({ ...p, tasks: [] })).toBe(0);
    expect(progress({ ...p, tasks: p.tasks.map((t) => ({ ...t, done: true })) })).toBe(100);
  });
  it('formats amounts as Brazilian currency', () => {
    expect(money(4800).replace(/\s/g, ' ')).toBe('R$ 4.800');
  });
});
