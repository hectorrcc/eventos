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
  Timestamp,
} from "firebase/firestore";
import { db } from "../../Firebase/Config.firebase";
import { ProcessedEvent, ViewEvent } from "@aldabil/react-scheduler/types";

const eventosCollection = collection(db, "eventos");

export async function getEventos(queryEvent: ViewEvent) {
  const result: ProcessedEvent[] = [];

  try {
    const q = query(
      eventosCollection,
      where("start", ">=", queryEvent.start),
      where("start", "<=", queryEvent.end)
    );

    const list = await getDocs(q);

    list.docs.map((item) => {
      const event = item.data();
      const start = event.start as Timestamp;
      const end = event.end as Timestamp;

      event.start = start.toDate();
      event.end = end.toDate();

      result.push(event as ProcessedEvent);
    });

    return result;
  } catch (error) {
    console.error(error);
    return result;
  }
}

export async function addEvent(event: ProcessedEvent) {
  try {
    const fecha = Date.now();
    event.createdAt = String(new Date(fecha));
    const data = await addDoc(eventosCollection, event);
    event.event_id = data.id;
    await setDoc(doc(eventosCollection, event.event_id), event);
    return event;
  } catch (error) {
    console.error(error);
  }
}

export async function editEvent(event: ProcessedEvent) {
  try {
    const fecha = Date.now();

    const docRef = doc(eventosCollection, event.event_id as string);
    await updateDoc(docRef, {
      title: event.title,
      clientId: event.clientId,
      start: event.start,
      //end: event.end,
      //description: event.description,
      color: event.color,
      updatedAt: String(new Date(fecha)),
    });

    return event;
  } catch (error) {
    console.error(new Error("Error al editar el cliente"), error);
  }
}
export async function deleteEvent(event_id: string) {
  try {
    deleteDoc(doc(eventosCollection, event_id));
  } catch (error) {
    console.error(error);
  }
}
