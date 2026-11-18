const RAW_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
export const API_BASE_URL = RAW_API_URL.replace(/\/+$/, '');

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

interface ApiRequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  auth?: boolean; // Defaults to true — attaches buttns_token if present
  timeoutMs?: number; // Generous default for Render free-tier wake-ups
  retries?: number; // Retries on network drop / 502 / 503 cold-start hiccups
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function apiRequest<T = any>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const {
    body,
    auth = true,
    timeoutMs = 45000, // 45s accommodates Render cold-start spin-up
    retries = 1,
    headers: customHeaders,
    ...fetchOptions
  } = options;

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(customHeaders as Record<string, string>),
  };

  if (auth && typeof window !== 'undefined') {
    const token = localStorage.getItem('buttns_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  let attempt = 0;

  while (true) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timer);

      // Retry transient Render gateway cold-start errors (502, 503, 504)
      if ([502, 503, 504].includes(response.status) && attempt < retries) {
        attempt++;
        await sleep(1500);
        continue;
      }

      const contentType = response.headers.get('content-type') || '';
      const data = contentType.includes('application/json')
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        // Auto-clear expired/invalid session on 401
        if (response.status === 401 && typeof window !== 'undefined' && auth) {
          localStorage.removeItem('buttns_user');
          localStorage.removeItem('buttns_token');
          window.dispatchEvent(new Event('buttns:unauthorized'));
        }

        const rawMessage =
          typeof data === 'object' && data !== null ? data.message : data;
        const friendlyMessage = Array.isArray(rawMessage)
          ? rawMessage[0]
          : rawMessage || `Request failed (${response.status})`;

        throw new ApiError(friendlyMessage, response.status);
      }

      return data as T;
    } catch (error: any) {
      clearTimeout(timer);

      const isAbort = error?.name === 'AbortError';
      const isNetworkDrop = error instanceof TypeError;

      if ((isAbort || isNetworkDrop) && attempt < retries) {
        attempt++;
        await sleep(1500);
        continue;
      }

      if (isAbort) {
        throw new ApiError(
          'Server took too long to wake up. Please tap again in a few seconds.',
          408,
        );
      }

      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        error?.message || 'Network error. Check your connection and try again.',
        0,
      );
    }
  }
}

// Convenient typed helpers for all Buttns modules
export const api = {
  get: <T = any>(endpoint: string, options?: ApiRequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: 'GET' }),

  post: <T = any>(endpoint: string, body?: unknown, options?: ApiRequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: 'POST', body }),

  patch: <T = any>(endpoint: string, body?: unknown, options?: ApiRequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: 'PATCH', body }),

  delete: <T = any>(endpoint: string, options?: ApiRequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: 'DELETE' }),
};