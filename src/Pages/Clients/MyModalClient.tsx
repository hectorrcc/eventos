/////////////////////  DATABASE AND MODELS/////////////////////////////////////
import { ClientModel, InitClient } from "../../Firebase/Models";
import { clientesCollection } from "../../Firebase/Collections/";
/////////////////////////////  COMPONENTS  ////////////////////////////////////////
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
//////////////////////////////////////////////////////////////////////////////////
////////////////////////////  HOOKS PROVIDERS ////////////////////////////////////////////
import { useState, useContext, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSnackbar } from "notistack";
import { clientContex, createContex } from "./ClientProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import { number, object, string } from "yup";
/////////////////////////////////////////////////////////////////////////////////



const schema = object({
  name: string()
    .required("El campo nombre es obligatorio")
    .min(1, "El nombre tiene que tener al menos un carácter")
    .max(100, "El nombre no puede superar los 100 carácteres"),

  lastName: string()
    .required("El campo apellido es obligatorio")
    .min(1, "El apellido tiene que tener al menos un carácter")
    .max(100, "El apellido no puede superar los 100 carácteres"),

  phone: number().required("El número de telefono es obligatorio"),

  email: string()
    .required("El email es obligatorio")
    .email("El email no tiene un formato válido"),
});

interface PropModal {
  open: boolean;
  handleOpenModal: () => void;
}
export default function MyModalClient({ open, handleOpenModal }: PropModal) {
  const { clientes, setClientes, clienteEdit, setClienteEdit } = useContext(
    clientContex
  ) as createContex;
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ClientModel>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: InitClient
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (clienteEdit.id != "") {
      fillForm(clienteEdit);
    }
  }, [clienteEdit]);

  const submitForm: SubmitHandler<ClientModel> = async (data: ClientModel) => {
    if (clienteEdit.id != "") {
      editClientModal(data);
    }
    if (clienteEdit.id == "") {
      const verificationEmail = await clientExit(data.email);
      if (!verificationEmail) {
        createNuewClient(data);
      }
    }
  };

  const createNuewClient = (data: ClientModel) => {
    setLoading(true);

    const response = async () => {
      const result = await clientesCollection.addClient(data);

      if (result.data) {
        const newClient = result.data as ClientModel;
        setClientes([...clientes, newClient]);
        resetForm();
        setLoading(false);
        handleOpenModal();
        enqueueSnackbar("Cliente agregado con exito", {
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "bottom",
          },
        });
      }
      if (result.error) {
        enqueueSnackbar(result.error, {
          variant: "error",
          anchorOrigin: {
            horizontal: "right",
            vertical: "bottom",
          },
        });
      }

      setLoading(false);
    };
    response();
  };

  const editClientModal = (data: ClientModel) => {
    setLoading(true);
    data.id = clienteEdit.id;

    const response = async () => {
      const result = await clientesCollection.editClient(data);
      if (result) {
        const newClients = clientes.map((item) => {
          if (item.id === clienteEdit.id) {
            item = data;
          }
          return item;
        });
        setClientes(newClients);
        setClienteEdit(InitClient);
        setLoading(false);
        resetForm();
        handleOpenModal();
        enqueueSnackbar("Cliente editado con exito", {
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "bottom",
          },
        });
      }
    };

    response();
  };

  const clientExit = async (email: string) => {
    const value = await clientesCollection.userExit(email);
    if (value) {
      enqueueSnackbar(`La direccion de correo ${email} ya existe `, {
        variant: "error",
        anchorOrigin: {
          horizontal: "right",
          vertical: "bottom",
        },
      });
      return true;
    } else {
      return false;
    }
  };

  const resetForm = (): void => {
    reset();
  
  };

  const fillForm = (data: ClientModel): void => {
    setValue("name", data.name);
    setValue("lastName", data.lastName);
    setValue("phone", data.phone);
    setValue("email", data.email);
  };

  return (
    <div>
      <Dialog open={open} maxWidth={"xs"}>
        <DialogTitle>Nuevo cliente</DialogTitle>
        <DialogContent>
          <TextField
            autoComplete="of"
            autoFocus
            margin="dense"
            id="name"
            label="Nombre"
            type="text"
            fullWidth
            variant="outlined"
            required
            {...register("name")}
            helperText={errors.name?.message}
            error={!!errors.name}
          />
          <TextField
            autoComplete="of"
            autoFocus
            margin="dense"
            id="lastName"
            label="Apellidos"
            type="text"
            fullWidth
            variant="outlined"
            required
            {...register("lastName")}
            helperText={errors.lastName?.message}
            error={!!errors.lastName}
          />
          <TextField
            autoComplete="of"
            autoFocus
            margin="dense"
            id="phone"
            label="Teléfono"
            type="tel"
            fullWidth
            variant="outlined"
            required
            {...register("phone")}
            helperText={errors.phone?.message}
            error={!!errors.phone}
          />
          <TextField
            autoComplete="of"
            autoFocus
            margin="dense"
            id="name"
            label="Correo"
            type="email"
            fullWidth
            variant="outlined"
            required
            placeholder="email@ejemplo.com"
            {...register("email")}
            helperText={errors.email?.message}
            error={!!errors.email}
            disabled={clienteEdit.email != ""}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            onClick={() => {
              handleOpenModal();
              resetForm();
            }}
            variant={"outlined"}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined"
            onClick={handleSubmit(submitForm)}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
