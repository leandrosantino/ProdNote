import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { trpc, createTRPCClient } from '../utils/api';


export function QueryProvider({ children }: { children: ReactNode }) {

  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(createTRPCClient())

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
