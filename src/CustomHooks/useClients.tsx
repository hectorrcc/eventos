import { useEffect, useState } from "react";
import { getClientes } from "../Firebase/Collections/Clients.Fireabe";
import { ClientModel } from "../Models";

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
      const list = await getClientes();
      if (list.length > 0) {
        setClients([...list]);
      }
      setLoading(false);
    };

    client();
  }, []);

  return { clients, load };
}
