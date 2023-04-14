import { useState, useEffect, useContext } from "react";
import ImagenAdd from "../../Componets/ImagenAdd";

import MyModalClient from "./MyModalClient";
import MyTable from "./MyTable";
import { clientContex, createContex } from "./ClientProvider";
import { getClientes } from "./Clients.Fireabe";
import MyCircularProgress from "../../Componets/MyCircularProgress";
import { Client } from "../../app/MyInterfaces";
import { createClient } from "../../Firebase/seds";

export const client: Client = {
  id: "",
  name: "",
  lastName: "",
  email: "",
  phone: "",
  createdAt: "",
  updatedAt: "",
};

export default function Clientes() {
  const [openModal, setOpenModal] = useState(false);
  const {
    clientes,
    setClientes,
    setClienteEdit,
    clientDelete,
    loading,
    setLoading,
  } = useContext(clientContex) as createContex;

  useEffect(() => {
    const client = async () => {
      const list = await getClientes();
      if (list.length > 0) {
        setClientes([...list]);
      }
      setLoading(false);
    };

    client();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(!openModal);

    if (openModal) {
      setClienteEdit(client);
    }
  };

  
  if (loading) {
    return <MyCircularProgress />;
  } else {
    if (clientes.length > 0) {
      return (
        <>
          <MyModalClient handleOpenModal={handleOpenModal} open={openModal} />
          
          <MyTable handleOpenModal={handleOpenModal} />
        </>
      );
    } else {
      return (
        <>
          <MyModalClient handleOpenModal={handleOpenModal} open={openModal} />

          <ImagenAdd handleEvent={handleOpenModal} />
        </>
      );
    }
  }
}
