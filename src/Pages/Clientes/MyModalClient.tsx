import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, ChangeEvent, useContext, FormEvent, useEffect } from "react";
import { Client, PropModal } from "../../app/MyInterfaces";
import { clientContex, createContex } from "./ClientProvider";
import { addClient, editClient } from "./Clients.Fireabe";
import { useSnackbar } from "notistack";
import { client } from "./Clientes";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

const schema = object({
  name: string()
    .required("El campo nombre es obligatorio")
    .min(1, "El nombre tiene que tener al menos un carácter")
    .max(100, "El nombre no puede superar los 100 carácteres"),

  lastName: string()
    .required("El campo apellido es obligatorio")
    .min(1, "El apellido tiene que tener al menos un carácter")
    .max(100, "El apellido no puede superar los 100 carácteres"),

  phone: string().required("El número de telefono es obligatorio"),

  email: string()
    .required("El email es obligatorio")
    .email("El email no tiene un formato válido"),
});

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
  } = useForm<Client>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (clienteEdit.id != "") {
      fillForm(clienteEdit);
    }
  }, [clienteEdit]);

  const submitForm: SubmitHandler<Client> = (data: Client) => {
    if (clienteEdit.id != "") {
      editClientModal(data);
    } else {
      createNuewClient(data);
    }
  };

  const createNuewClient = (data: Client) => {
    setLoading(true);

    const response = async () => {
      const result = await addClient(data);
      try {
        if (result.idClient) {
          const newClient = data;
          newClient.id = result.idClient as string;
          setClientes([...clientes, newClient]);
          resetForm(data);
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
      } catch (error) {
        enqueueSnackbar("error al crear el cliente", {
          variant: "error",
          anchorOrigin: {
            horizontal: "right",
            vertical: "bottom",
          },
        });
      }
    };
    response();
  };

  const editClientModal = (data: Client) => {
    setLoading(true);
    data.id = clienteEdit.id;

    const response = async () => {
      const result = await editClient(data);
      if (result) {
        const newClients = clientes.map((item) => {
          if (item.id === clienteEdit.id) {
            item = data;
          }
          return item;
        });
        setClientes(newClients);
        setClienteEdit(client);
        setLoading(false);
        resetForm(data);
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

  const resetForm = (data: Client): void => {
    reset();
    setValue("name", "");
    setValue("lastName", "");
    setValue("phone", "");
    setValue("email", "");
  };

  const fillForm = (data: Client): void => {
    setValue("name", data.name);
    setValue("lastName", data.lastName);
    setValue("phone", data.phone);
    setValue("email", data.email);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleOpenModal} maxWidth={"xs"}>
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
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleOpenModal} variant={"outlined"}>
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
