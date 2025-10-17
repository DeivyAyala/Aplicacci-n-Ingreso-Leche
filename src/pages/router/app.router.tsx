// import { createBrowserRouter } from "react-router";
// import { InicioPage } from '../Registro/Items/Inicio/InicioPage';
// import { IngresoPage } from "../Registro/Items/Ingreso/IngresoPage";
// import { HistorialPage } from "../Registro/Items/Historial/HistorialPage";
// import { ReportesPage } from "../Registro/Items/Reportes/ReportesPage";
// import { ConfiguracionPage } from "../Registro/Items/Configuración/ConfiguracionPage";
// import { RegistroPage } from "../Registro/Items/RemisionDetalles/RegistroPage";
// import { LayoutLogin } from "../Auth/Layout/LayoutLogin";
// import { LoginPage } from "../Auth/Pages/Login/LoginPage";
// import { RegisterPage } from "../Auth/Pages/CrearCuenta/RegisterPage";
// import { LayoutRegistro } from "../Layout/LayoutRegistro";
// import { RecuperarPasswordPage } from "../Auth/Pages/RecuperarContraseña/RecuperarPasswordPage";


// export const appRouter = createBrowserRouter([

//     {
//         path: '/',
//         element: <LayoutRegistro/>,
//         children: [
//             {
//                 index: true,
//                 element: <InicioPage/>
//             },
//             {
//                 path: 'ingreso',
//                 element: <IngresoPage/>
//             },
//             {
//                 path: 'historial',
//                 element: <HistorialPage/>
//             },
//             {
//                 path: 'reportes',
//                 element: <ReportesPage/>
//             },
//             {
//                 path: 'configuracion',
//                 element: <ConfiguracionPage/>
//             },
//             {
//                 path: 'registro/:id',
//                 element: <RegistroPage/>
//             }
//         ]
//     },
//     {
//         path: '/login',
//         element: <LayoutLogin/>,
//         children:[
//             {
//                 index: true,
//                 element: <LoginPage/>
//             },
//             {
//                 path: 'crearCuenta',
//                 element: <RegisterPage/>
//             },
//             {
//                 path: 'contraseña',
//                 element: <RecuperarPasswordPage/>
//             }
//         ]
        
//     },
//     {
//         path: "*", // ✅ ruta comodín para 404
//         element: <h1>❌ 404 - Página no encontrada</h1>,
//     },

    
// ])

