import { useEffect, useState } from "react";
import { clientesCollection } from "../Firebase/Collections/";
import { ClientModel } from "../Firebase/Models";
import { enqueueSnackbar } from "notistack";

const ClienInit: ClientModel = {
  id: "",
  name: "",
  lastName: "",
  email: "",
  phone: "",
  createdAt: "",
  updatedAt: "",
};
export function useClient() {
  const [clients, setClients] = useState([ClienInit]);
  const [load, setLoading] = useState(true);

  useEffect(() => {
    const client = async () => {
      const response = await clientesCollection.getClientes();
      if (response.data) {
        setClients([...(response.data as [])]);
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

  return { clients, load };
}
