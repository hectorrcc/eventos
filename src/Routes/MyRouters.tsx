import Clientes from "../Pages/Clientes";
import Calendario from "../Pages/Calendario";
import Layout from "../Componets/Layout";
import Home from "../Pages/Home";
import { RouteObject } from "react-router";


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
      element: <Clientes />,
    },
    {
      path: "/calendario",
      element: <Calendario />,
    },
  ]
};
