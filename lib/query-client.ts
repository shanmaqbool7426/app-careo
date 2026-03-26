import { QueryClient } from '@tanstack/react-query';
import { Platform } from 'react-native';

const BASE_URL = Platform.select({
  web: '',
  default: process.env.EXPO_PUBLIC_API_URL || '',
});

export function getApiUrl() {
  return BASE_URL;
}

export async function apiRequest(method: string, path: string, body?: unknown) {
  const url = new URL(path, getApiUrl() || 'http://localhost:5000').toString();
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});
