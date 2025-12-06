const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export default async function fetchApi(path: string, options?: RequestInit) {
  const res = await fetch(`${baseURL}${path}`, {
    ...options,
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || `Failed to fetch: ${res.statusText}`);
  }
  return res.json();
}
