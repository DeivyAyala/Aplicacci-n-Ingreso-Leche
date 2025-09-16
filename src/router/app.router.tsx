import { createBrowserRouter } from "react-router";
import { InicioPage } from '../Registro/Pages/Inicio/InicioPage';
import { IngresoPage } from "@/Registro/Pages/Ingreso/IngresoPage";
import { HistorialPage } from "@/Registro/Pages/Historial/HistorialPage";
import { ReportesPage } from "@/Registro/Pages/Reportes/ReportesPage";
import { LayoutRegistro } from "@/Registro/Layout/LayoutRegistro";
import { LoginPage } from "@/Auth/Pages/Login/LoginPage";
import { LayoutLogin } from "@/Auth/Layout/LayoutLogin";
import { ConfiguracionPage } from "@/Registro/Pages/Configuración/ConfiguracionPage";
import { RecuperarContraseña } from "@/Auth/Pages/RecuperarContraseña/RecuperarContraseña";
import { RegisterPage } from "@/Auth/Pages/CrearCuenta/RegisterPage";
import { RegistroPage } from "@/Registro/Pages/RemisionDetalles/RegistroPage";


export const appRouter = createBrowserRouter([

    {
        path: '/',
        element: <LayoutRegistro/>,
        children: [
            {
                index: true,
                element: <InicioPage/>
            },
            {
                path: 'ingreso',
                element: <IngresoPage/>
            },
            {
                path: 'historial',
                element: <HistorialPage/>
            },
            {
                path: 'reportes',
                element: <ReportesPage/>
            },
            {
                path: 'configuracion',
                element: <ConfiguracionPage/>
            },
            {
                path: 'registro/:id',
                element: <RegistroPage/>
            }
        ]
    },
    {
        path: '/login',
        element: <LayoutLogin/>,
        children:[
            {
                index: true,
                element: <LoginPage/>
            },
            {
                path: 'crearCuenta',
                element: <RegisterPage/>
            },
            {
                path: 'contraseña',
                element: <RecuperarContraseña/>
            }
        ]
        
    },
    {
        path: "*", // ✅ ruta comodín para 404
        element: <h1>❌ 404 - Página no encontrada</h1>,
    },

    
])

