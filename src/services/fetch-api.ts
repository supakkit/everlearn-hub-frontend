const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export default async function fetchApi(path: string, options?: RequestInit) {
  const res = await fetch(`${baseURL}${path}`, {
    ...options,
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}
