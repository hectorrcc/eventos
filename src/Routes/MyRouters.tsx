import Layout from "../Componets/Layout";
import Home from "../Pages/Home";
import { Navigate, RouteObject } from "react-router";
import Clients from "../Pages/Clients";
import Eventos from "../Pages/Eventos";
import { ClientProvider } from "../Pages/Clients/ClientProvider";
import Login from "../Pages/Login";
import ProtectRuters from "../Componets/ProtectRuters";

export const rutas: RouteObject[] = [
  { element: <Navigate to={"/home"} />, path: "/" },

  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <ProtectRuters />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/home",
            element: <Home />,
          },
          {
            path: "/clientes",
            element: (
              <ClientProvider>
                <Clients />
              </ClientProvider>
            ),
          },
          {
            path: "/eventos",
            element: <Eventos />,
          },
        ],
      },
    ],
  },
];
