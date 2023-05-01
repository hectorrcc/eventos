import { useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";
import Checkbox from "@mui/material/Checkbox";
import MyBar from "../../Componets/MyBar";
import { clientContex, createContex } from "./ClientProvider";
import { deletClient, getClientes } from "../../Firebase/Collections/Clients.Fireabe";
import MyModalAlert from "../../Componets/MyModalAlert";
import MyAvatar from "../../Componets/MyAvatar";
import { ClientModel } from "../../Firebase/Models";

interface Column {
  id: "check" | "avatar" | "name" | "email" | "phone" | "options";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

interface Data {
  check: React.ReactNode;
  avatar: React.ReactNode;
  name: string;
  email: string;
  phone: string;
  options: React.ReactNode[];
}

interface PropTable {
  handleOpenModal: () => void;
}

export default function MyTable({ handleOpenModal }: PropTable) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModalAlert, setOpenModalAlert] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const {
    clientes,
    setClientes,
    clienteEdit,
    setClienteEdit,
    clientDelete,
    setClientDelete,
    loading,
    setLoading,
  } = useContext(clientContex) as createContex;

  const handleDeleteClient = async () => {
    setLoading(true);
    if (clientDelete.length > 0) {
      await deletClient(clientDelete);
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
      console.log(temp);

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

  const handleEditClient = (id: string) => {
    const client = clientes.filter((item) => item.id === id);
    setClienteEdit(client[0]);
    handleOpenModal();
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

  const handleCheck = (event: any, id: string) => {
    if (event.target.checked) {
      let existsClient = false;
      clientDelete.forEach((item) => {
        item === id ? (existsClient = true) : (existsClient = false);
      });
      if (!existsClient) {
        setClientDelete([...clientDelete, id]);
      }
    }
    if (!event.target.checked) {
      const filterClient = clientDelete.filter((item) => item !== id);
      setClientDelete(filterClient);
    }
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function createData(
    id: string,
    name: string,
    lastName: string,
    email: string,
    phone: string
  ): Data {
    name = name + " " + lastName;

    const edit = (
      <IconButton key={id} color="info" onClick={() => handleEditClient(id)}>
        <CreateIcon />
      </IconButton>
    );
    const deLet = (
      <IconButton key={name} color="error" onClick={() => handleModalAlert(id)}>
        <DeleteIcon />
      </IconButton>
    );
    const checkControl = (): boolean => {
      let result = false;
      const client = clientDelete.filter((item) => item === id);
      client.length > 0 ? (result = true) : (result = false);
      return result;
    };
    const options = [edit, deLet];
    const avatar = <MyAvatar avatarName={name + lastName} />;
    const check = (
      <Checkbox
        onChange={(event) => handleCheck(event, id)}
        checked={checkControl()}
      />
    );

    return { check, avatar, name, email, phone, options };
  }

  const columns: readonly Column[] = [
    { id: "check", label: "Select" },
    { id: "avatar", label: "Avatar" },
    { id: "name", label: "Nombre" },
    { id: "email", label: "Correo" },
    { id: "phone", label: "Teléfono" },
    { id: "options", label: "Opciones" },
  ];
  const rows = clientes.map((item) => {
    const id = item.id || "";
    const name = item.name || "";
    const lastName = item.lastName || "";
    const email = item.email || "";
    const phone = item.phone || "";
    return createData(id, name, lastName, email, phone);
  });

  return (
    <>
      <MyBar
        deleteElemts={clientDelete}
        name="Lista de Clientes"
        handleEventCreate={handleOpenModal}
        handleEventDelete={handleOpenModalAlert}
      />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 420 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.email}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <MyModalAlert
          handleSubmit={() => handleDeleteClient()}
          handleOpenModal={handleOpenModalAlert}
          open={openModalAlert}
        />
      </Paper>
    </>
  );
}
