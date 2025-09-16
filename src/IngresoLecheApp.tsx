import { RouterProvider } from 'react-router';
import { appRouter } from './router/app.router';

export const IngresoLecheApp = () => {
  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
    
  )
}
