export const typedFetchJSON = async <T>(input: RequestInfo | URL, init?: RequestInit) => {
  const res = await fetch(input, init);
  return res.json() as T;
}
export const get = <T>(input: RequestInfo | URL) => typedFetchJSON<T>(input, { method: 'GET' });
export const post = <T>(input: RequestInfo | URL, params: Record<string, any>) => typedFetchJSON<T>(
  input,
  {
    method: 'POST',
    body: String(params),
    headers: { 'Content-Type': 'application/json' },
  }
);
