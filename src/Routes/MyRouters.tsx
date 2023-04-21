import Layout from "../Componets/Layout";
import Home from "../Pages/Home";
import { RouteObject } from "react-router";
import Clients from "../Pages/Clients"
import Eventos from "../Pages/Eventos";
import { ClientProvider } from "../Pages/Clients/ClientProvider";


export const MyRouters: RouteObject = {
  //path: "/",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: "/clientes",
      element:<ClientProvider><Clients/></ClientProvider> ,
      
    },
    {
      path: "/eventos",
      element: <Eventos />,
    },
  ]
};
