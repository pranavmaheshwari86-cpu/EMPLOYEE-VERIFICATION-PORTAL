import React from 'react';
import posthog from 'posthog-js';
import { PostHogProvider as Provider } from 'posthog-js/react';

if (typeof window !== 'undefined' && import.meta.env.VITE_POSTHOG_KEY) {
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com',
    loaded: (posthog) => {
      if (import.meta.env.MODE === 'development') posthog.debug(false);
    },
    capture_pageview: false, // We'll handle this manually for SPAs if needed
  });
}

export function PostHogProvider({ children }) {
  if (!import.meta.env.VITE_POSTHOG_KEY) {
    return <>{children}</>;
  }
  return <Provider client={posthog}>{children}</Provider>;
}
