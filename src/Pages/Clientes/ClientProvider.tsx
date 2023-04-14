import { createContext, useState } from "react";
import { Client } from "../../app/MyInterfaces";
import { client } from "./Clientes";

interface PropClientProvider {
  children: React.ReactNode;
}

export interface createContex {
  clientes: Client[];
  setClientes: (item: Client[]) => void;

  clienteEdit: Client;
  setClienteEdit: (item: Client) => void;

  clientDelete: string[];
  setClientDelete: (item: string[]) => void;

  loading: boolean;
  setLoading: (valor: boolean) => void;
}

export const clientContex = createContext({});

export function ClientProvider({ children }: PropClientProvider) {
  const [clientes, setClientes] = useState<Array<Client>>([]);
  const [clienteEdit, setClienteEdit] = useState<Client>(client);
  const [clientDelete, setClientDelete] = useState<Array<string>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <clientContex.Provider
      value={{
        clientes,
        setClientes,
        clienteEdit,
        setClienteEdit,
        clientDelete,
        setClientDelete,
        loading,
        setLoading
      }}
    >
      {children}
    </clientContex.Provider>
  );
}
