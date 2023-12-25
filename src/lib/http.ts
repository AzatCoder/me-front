export const typedFetchJSON = async <T>(input: RequestInfo | URL, init?: RequestInit) => {
  const res = await fetch(input, init);
  return res.json() as T;
}
export const get = <T>(input: RequestInfo | URL) => typedFetchJSON<T>(input, { method: 'GET' });
export const post = <T>(input: RequestInfo | URL, params: Record<string, any>) => typedFetchJSON<T>(
  input,
  {
    method: 'POST',
    body: JSON.stringify(params),
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }
);
