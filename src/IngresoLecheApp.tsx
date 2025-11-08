import { BrowserRouter } from 'react-router';
// import { appRouter } from './pages/router/app.router';
import { AppRoutes } from './routes/AppRoutes';

import {Provider} from 'react-redux'
import { store } from './store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


export const IngresoLecheApp = () => {

  // Usuario temporal (Configurar mas adelante)
  const user = {
    name: "Juan Pérez",
    role: "admin", // Cambiar por "operador" o "calidad" para probar
  }

  // const user = undefined
  
  const queryClient = new QueryClient

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes user={user} />
        </BrowserRouter>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

    
    
  )
}
