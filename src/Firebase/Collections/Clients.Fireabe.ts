import { db } from "../Config.firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { ClientModel } from "../../Models";

export interface ResponseClient {
  arrayClient?: ClientModel[];
  idClient?: {};
  errorClient?: {} | unknown;
}

const clientCollection = collection(db, "clientes");

export async function getClientes() {
  try {
    const listClient: ClientModel[] = [];
    const clientSnarshopRef = await getDocs(clientCollection);

    clientSnarshopRef.docs.forEach((doc) => {
      let client = doc.data() as ClientModel;
      client.id = doc.id;
      listClient.push(client);
    });

    return listClient;
  } catch (error) {
    console.error(new Error("Error al cargar los cliente"), error);
    return [];
  }
}

export async function addClient(client: ClientModel) {
  const response: ResponseClient = {};
  try {
    const fecha = Date.now();
    client.createdAt = String(new Date(fecha));
    const resp = await addDoc(clientCollection, client);
    client.id = resp.id;
    setDoc(doc(clientCollection, client.id), client);
    response.idClient = resp.id;
    return response;
  } catch (error) {
    console.error(new Error("Error al agregar el cliente"), error);
    return response;
  }
}

export async function deletClient(clientID: string[]) {
  try {
    clientID.map(async (item) => {
      await deleteDoc(doc(clientCollection, item));
    });
    //return await getClientes();
  } catch (error) {
    console.error(new Error("Error al eliminar el cliente"), error);
    return [];
  }
}

export async function editClient(client: ClientModel) {
  try {
    const fecha = Date.now();
    console.log(client);

    const docRef = doc(clientCollection, client.id);
    const resp = await updateDoc(docRef, {
      name: client.name,
      lastName: client.lastName,
      email: client.email,
      updatedAt: String(new Date(fecha)),
    });

    return true;
  } catch (error) {
    console.error(new Error("Error al editar el cliente"), error);
  }
}

export async function userExit(email: string) {
  try {
    const q = query(clientCollection, where("email", "==", email));
    const client = await getDocs(q);

    if (client.docs.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}
