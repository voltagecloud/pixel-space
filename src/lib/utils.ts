export async function postJson<T>(url: string, data: unknown) {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  });
  return res.json() as Promise<T>;
}