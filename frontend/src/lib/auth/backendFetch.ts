export default async function backendFetch(
  backendEndpoint: string,
  init?: RequestInit | undefined,
): Promise<Response> {
  return fetch(
    `/api/auth?api_url=${encodeURIComponent(backendEndpoint)}`,
    init,
  );
}
