import { useState } from "react";
import MyBar from "../Componets/MyBar";
import MyModalClient from "../Componets/MyModalClient";
import MyTable from "../Componets/MyTable";

export default function Clientes() {
  const [opeModal, setOpenModal] = useState(false)

  const handleCloseModal = ()=>{
    setOpenModal(false);
  };
  const handleOpenModal = ()=>{
    setOpenModal(true);
  };
  return (
    <>
      <MyBar name="Clientes" handleEvent={handleOpenModal}/>
      <MyTable />
      <MyModalClient open={opeModal} handleClose={handleCloseModal} />
    </>
  );
}
