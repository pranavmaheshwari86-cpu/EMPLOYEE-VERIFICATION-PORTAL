import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

  return createBrowserClient(url, key, {
    global: {
      fetch: async (input, init) => {
        try {
          return await fetch(input, init);
        } catch (err: any) {
          console.warn("Supabase fetch caught in client wrapper:", err.message);
          return new Response(
            JSON.stringify({
              error: 'network_error',
              error_description: 'Failed to connect to Supabase authentication server.',
              message: 'Failed to fetch',
            }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }
      },
    },
  });
}
