import { QueryClient } from '@tanstack/react-query';

export const queryClientInstance = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            // 5 minutes of "freshness" - the app won't re-fetch 
            // the same data unless the user refreshes the page manually.
            staleTime: 1000 * 60 * 5, 
        },
    },
});