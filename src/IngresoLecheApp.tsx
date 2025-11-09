import { BrowserRouter } from 'react-router';
// import { appRouter } from './pages/router/app.router';
import { AppRoutes } from './routes/AppRoutes';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Toaster} from 'sonner'
import { useAuthStore } from './pages/Auth/store/auth.store';


export const IngresoLecheApp = () => {
  const queryClient = new QueryClient
  const { user } = useAuthStore() 

  return (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Toaster />
          <AppRoutes user={user} />
        </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

    
    
  )
}
