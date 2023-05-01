//////////////////////   HOOKS   ///////////////////////////////////////////////
import { useSnackbar } from "notistack";
import { useState, useEffect, useContext } from "react";
////////////////////////////////////////////////////////////////////////////////
/////////////////////  DATABASE AND MODELS/////////////////////////////////////
import { clientesCollection } from "../../Firebase/Collections/";
import { ClientModel, InitClient } from "../../Firebase/Models";
///////////////////////////////////////////////////////////////////////////////
//////////////////// PROVIDERS ////////////////////////////////////////////////
import { clientContex, createContex } from "./ClientProvider";
///////////////////////////////////////////////////////////////////////////////
//////////////////// COMPONETS  //////////////////////////////////////////////
import MyModalClient from "./MyModalClient";
import Box from "@mui/material/Box";
import MyAvatar from "../../Componets/MyAvatar";
import MyBar from "../../Componets/MyBar";
import MyCircularProgress from "../../Componets/MyCircularProgress";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRenderCellParams,
  GridRowEditStartParams,
  GridRowSelectionModel,
  MuiBaseEvent,
} from "@mui/x-data-grid";
import MyModalAlert from "../../Componets/MyModalAlert";
import ImagenAdd from "../../Componets/ImagenAdd";
import ButtonMenu from "../../Componets/ButtonMenu";
import { trasletor_dataDrid } from "../../utils";
////////////////////////////////////////////////////////////////////////////////

interface Data {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
}

function createData(
  id: string,
  name: string,
  lastName: string,
  email: string,
  phone: string
): Data {
  return { id, name, lastName, email, phone };
}

export default function Clients() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalAlert, setOpenModalAlert] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const {
    clientes,
    setClientes,
    setClienteEdit,
    loading,
    setLoading,
    clientDelete,
    setClientDelete,
  } = useContext(clientContex) as createContex;

  useEffect(() => {
    const client = async () => {
      const response = await clientesCollection.getClientes();
      if (response.data) {
        setClientes([...(response.data as [])]);
      }
      if (response.error) {
        enqueueSnackbar(response.error, {
          variant: "error",
          anchorOrigin: {
            horizontal: "right",
            vertical: "bottom",
          },
        });
      }
      setLoading(false);
    };

    client();
  }, []);

  const generateData = () => {
    let data: Data[] = [];
    clientes.forEach((item) => {
      let { id, name, lastName, email, phone }: ClientModel = item;
      const temp = createData(id, name, lastName, email, phone);
      data.push(temp);
    });
    return data;
  };

  const handleOpenModal = () => {
    setOpenModal(!openModal);

    if (openModal) {
      setClienteEdit(InitClient);
    }
  };

  const handleOpenModalAlert = () => {
    setOpenModalAlert(!openModalAlert);
    if (openModalAlert) {
      setClientDelete([]);
    }
  };
  const handleModalAlert = (id: string) => {
    setClientDelete([...clientDelete, id]);
    handleOpenModalAlert();
  };

  const handleDeleteClient = async () => {
    setLoading(true);
    if (clientDelete.length > 0) {
      await clientesCollection.deletClient(clientDelete);
      const temp = clientes;
      clientDelete.forEach((item) => {
        temp.map((client, key) => {
          if (client.id === item) {
            temp[key] = temp[temp.length - 1];
            temp.pop();
          }
        });
      });

      setClientDelete([]);
      setClientes(temp);

      setOpenModalAlert(!openModalAlert);
      setLoading(false);
      enqueueSnackbar("Cliente eliminado con exito", {
        variant: "success",
        anchorOrigin: {
          horizontal: "right",
          vertical: "bottom",
        },
      });
    }
  };
  const handleEditClient = (id: string): void => {
    const client = clientes.filter((item) => item.id === id);
    setClienteEdit(client[0]);
    handleOpenModal();
  };

  const handleEditRow = (params: GridCellParams) => {
    const client = params.row;
    const key = params.field;
    client[key] = params;
    console.log();

    //clientesCollection.editClient(client);
  };

  const handleSelectionModelChange = (newSelection: GridRowSelectionModel) => {
    setClientDelete(newSelection as string[]);
  };
  const columns: GridColDef[] = [
    {
      field: "avatar",
      headerName: "Avatar",
      disableColumnMenu: true,
      disableReorder: true,
      // width: 150,
      renderCell: (params: GridRenderCellParams) => {
        const name = params.row.name + " " + params.row.lastName;
        return <MyAvatar avatarName={name} />;
      },
    },
    {
      field: "name",
      headerName: "Nombre",
      width: 200,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Apellidos",
      width: 250,
      editable: true,
    },
    {
      field: "email",
      headerName: "Correo",
      width: 250,
      editable: false,
    },
    {
      field: "phone",
      headerName: "Teléfono",
      width: 250,
      editable: true,
    },
    {
      field: "opciones",
      headerName: "Opciones",
      disableColumnMenu: true,
      disableReorder: true,
      disableExport: true,
      width: 200,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <ButtonMenu
            handleDelete={() => handleModalAlert(params.row.id)}
            handleEdit={() => handleEditClient(params.row.id)}
          />
        );
      },
    },
  ];

  if (loading) {
    return <MyCircularProgress />;
  } else {
    if (clientes.length > 0) {
      return (
        <>
          <MyModalClient handleOpenModal={handleOpenModal} open={openModal} />
          <MyModalAlert
            handleSubmit={() => handleDeleteClient()}
            handleOpenModal={handleOpenModalAlert}
            open={openModalAlert}
          />
          <MyBar
            deleteElemts={clientDelete}
            name="Lista de Clientes"
            handleEventCreate={handleOpenModal}
            handleEventDelete={handleOpenModalAlert}
          />

          <Box sx={{ height: 400, width: "100%", background: "white" }}>
            <DataGrid
              rows={generateData()}
              columns={columns}
              localeText={trasletor_dataDrid}
              onCellEditStop={handleEditRow}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={handleSelectionModelChange}
            />
          </Box>
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
