import { BrowserRouter } from 'react-router';
// import { appRouter } from './pages/router/app.router';
import { AppRoutes } from './routes/AppRoutes';

export const IngresoLecheApp = () => {

  // Usuario temporal (Configurar mas adelante)
  const user = {
    name: "Juan Pérez",
    role: "admin", // Cambiar por "operador" o "calidad" para probar
  }

  // const user = undefined

  return (
    <BrowserRouter>
      {/* <RouterProvider router={appRouter}/> */}
      <AppRoutes user={user} />
    </BrowserRouter>
    
  )
}
