import { BrowserRouter } from 'react-router';
import { AppRoutes } from './routes/AppRoutes';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Toaster} from 'sonner'
import { useAuthStore } from './pages/Auth/store/auth.store';
import type { PropsWithChildren } from 'react';
import CustomFullScreenLoading from './components/CustomFullScreenLoading';

const queryClient = new QueryClient()

export const CheckAuthProvider = ({children}: PropsWithChildren) => { 
  const { checkAuthStatus } = useAuthStore()
  const { isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 1.5,
    refetchOnWindowFocus: true
  })

  if(isLoading) return <CustomFullScreenLoading message='Espere un Momento...' />

  return children
}



export const IngresoLecheApp = () => {
  
  const { user } = useAuthStore() 

  return (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Toaster />
          <CheckAuthProvider>
             <AppRoutes user={user} />
          </CheckAuthProvider>
        </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

    
    
  )
}
