/** Resolve a public asset path (no leading slash) against the Vite base URL. */
export function asset(path: string): string {
  return import.meta.env.BASE_URL + path
}
