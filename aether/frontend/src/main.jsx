import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { PostHogProvider } from './providers/PostHogProvider.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <PostHogProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </PostHogProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
