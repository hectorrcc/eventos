import { db, findOutConnection } from "../Config.firebase";
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

import { ClientModel, Response } from "../Models";
import { errorApi } from "../../utils";

const clientCollection = collection(db, "clientes");

export async function getClientes() {
  let response: Response = {};
  try {
    const findConnection = true;
    if (findConnection) {
      const listClient: ClientModel[] = [];
      const clientSnarshopRef = await getDocs(clientCollection);

      clientSnarshopRef.docs.forEach((doc) => {
        let client = doc.data() as ClientModel;
        client.id = doc.id;
        listClient.push(client);
      });
      response.data = listClient;
      return response;
    } else {
      const newError = new Error(errorApi.failGetData).message;
      response.error = newError;
      console.error(newError);
      return response;
    }
  } catch (error) {
    const newError = new Error(errorApi.failGetData).message;
    response.error = newError;
    console.error(newError);
    return response;
  }
}

export async function addClient(client: ClientModel) {
  let response: Response = {};
  try {
    const fecha = Date.now();
    client.createdAt = String(new Date(fecha));
    const resp = await addDoc(clientCollection, client);
    client.id = resp.id;
    setDoc(doc(clientCollection, client.id), client);
    response.data = client;
    return response;
  } catch (error) {
    const newError = new Error(errorApi.failCreateData).message;
    response.error = newError;
    console.error(newError, error);
    return response;
  }
}

export async function deletClient(clientID: string[]) {
  let response: Response = {};
  try {
    clientID.map(async (item) => {
      await deleteDoc(doc(clientCollection, item));
    });
    //return await getClientes();
  } catch (error) {
    console.error(new Error(errorApi.failDeleteData), error);
    return [];
  }
}

export async function editClient(client: ClientModel) {
  const response: Response = {};
  try {
    const fecha = Date.now();

    const docRef = doc(clientCollection, client.id);
    const resp = await updateDoc(docRef, {
      name: client.name,
      lastName: client.lastName,
      email: client.email,
      updatedAt: String(new Date(fecha)),
    });
    // response.data = resp

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
