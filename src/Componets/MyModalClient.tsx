import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {useState, ChangeEvent} from "react"
import { Client } from "../app/MyInterfaces";
import { log } from "console";

type PropModal = {
  open: boolean;
  handleClose: () => void;
};

const client:any ={
name: null,
lastName: null,
email: null,
phone: null

};

export default function MyModalClient({ open, handleClose }: PropModal) {
  const [Form, setForm] = useState(client);

  const handleForm = (event: ChangeEvent<HTMLInputElement>):void=>{
   
    event.preventDefault();
    const nameInput = event.target.name;
    const valueInput: string | Number = event.target.value;

    const data:any = {};
    data[nameInput] = valueInput ;
    console.log(data);
    
    setForm({...Form, [nameInput]: valueInput});
   
    
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth={"xs"}>
        <DialogTitle>Nuevo cliente</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            autoFocus
            margin="dense"
            id="name"
            label="Nombre"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleForm}
          />
          <TextField
            name="lastName"
            autoFocus
            margin="dense"
            id="lastName"
            label="Apellidos"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleForm}
          />
          <TextField
            name="phone"
            autoFocus
            margin="dense"
            id="phone"
            label="Teléfono"
            type="tel"
            fullWidth
            variant="outlined"
            onChange={handleForm}
          />
          <TextField
            name="email"
            autoFocus
            margin="dense"
            id="name"
            label="Correo"
            type="email"
            fullWidth
            variant="outlined"
            onChange={handleForm}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose} variant={"outlined"}>Cancel</Button>
          <Button variant="outlined" onClick={handleClose}>Enviar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
