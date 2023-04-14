import Layout from "../Componets/Layout";
import Home from "../Pages/Home";
import { RouteObject } from "react-router";
import IndexClient from "../Pages/Clientes/IndexClient";
import IndexEventos from "../Pages/Eventos/IndexEventos";


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
      element: <IndexClient />,
      
    },
    {
      path: "/calendario",
      element: <IndexEventos />,
    },
  ]
};
