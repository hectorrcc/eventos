import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import imagen from "../img/agregar-archivo.png";
import MyItem from "../Componets/Item";
import { Typography } from "@mui/material";
import React from "react";
import   "./MyStilos.css"

interface PropImagen {
    handleEvent: ()=> void
};



export default function ImagenAdd({handleEvent}: PropImagen) {
  return (
    <>
      <>
        <Grid2>
          <MyItem texAling={"center"} >
            <img className="imgAdd" onClick={handleEvent} src={imagen} width={"200px"} height={"200px"}  />
           <Typography>No hay clientes en el sistema, toque para agregar uno nuevo</Typography>
          </MyItem>
        </Grid2>
      </>
    </>
  );
}
