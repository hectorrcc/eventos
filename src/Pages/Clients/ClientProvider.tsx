import { createContext, useState } from "react";
import { ClientModel } from "../../Models"
import { client } from "./Clients";

interface PropClientProvider {
  children: React.ReactNode;
}

export interface createContex {
  clientes: ClientModel[];
  setClientes: (item: ClientModel[]) => void;

  clienteEdit: ClientModel;
  setClienteEdit: (item: ClientModel) => void;

  clientDelete: string[];
  setClientDelete: (item: string[]) => void;

  loading: boolean;
  setLoading: (valor: boolean) => void;
}

export const clientContex = createContext({});

export function ClientProvider({ children }: PropClientProvider) {
  const [clientes, setClientes] = useState<Array<ClientModel>>([]);
  const [clienteEdit, setClienteEdit] = useState<ClientModel>(client);
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
