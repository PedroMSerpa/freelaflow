export interface LocalSession {
  name: string;
}
const key = 'freelaflow:demo-session:v1';
export function readSession(): LocalSession | null {
  try {
    const value: unknown = JSON.parse(sessionStorage.getItem(key) ?? 'null');
    if (
      value &&
      typeof value === 'object' &&
      'name' in value &&
      typeof value.name === 'string' &&
      value.name.trim() &&
      value.name.length <= 60
    )
      return { name: value.name };
  } catch {
    /* Session is optional; the form remains available. */
  }
  return null;
}
export function saveSession(session: LocalSession) {
  try {
    sessionStorage.setItem(key, JSON.stringify(session));
  } catch {
    /* In-memory navigation still works. */
  }
}
export function clearSession() {
  try {
    sessionStorage.removeItem(key);
  } catch {
    /* In-memory session is cleared by the caller. */
  }
}
export function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}
