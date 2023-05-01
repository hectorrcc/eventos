import { Scheduler } from "@aldabil/react-scheduler";
import {
  blue,
  green,
  pink,
  purple,
  red,
  teal,
  yellow,
} from "@mui/material/colors";
import { SelectOption } from "@aldabil/react-scheduler/components/inputs/SelectInput";
import MyCircularProgress from "../../Componets/MyCircularProgress";
import { Item } from "../../Componets/MyContainer";
import {
  EventActions,
  ProcessedEvent,
  ViewEvent,
} from "@aldabil/react-scheduler/types";
import {
  addEvent,
  deleteEvent,
  editEvent,
  getEventos,
} from "../../Firebase/Collections/eventos.firabase";

import { useClient } from "../../CustomHooks";
import { enqueueSnackbar } from "notistack";

const colors: SelectOption[] = [
  {
    id: red[900],
    text: "Rojo",
    value: red[900],
  },
  {
    id: blue[900],
    text: "Azul",
    value: blue[900],
  },
  {
    id: pink[900],
    text: "Rosa",
    value: pink[900],
  },
  {
    id: purple[900],
    text: "Purpura",
    value: purple[900],
  },
  {
    id: yellow[900],
    text: "Amarillo",
    value: yellow[900],
  },
  {
    id: green[900],
    text: "Verde",
    value: green[900],
  },
  {
    id: teal[900],
    text: "Verde azulado",
    value: teal[900],
  },
];

export default function Eventos() {
  const { clients, load } = useClient();
  let lisClient = clients.map((item) => {
    const tem = {
      id: item.id,
      text: item.name + " " + item.lastName,
      value: item.id,
    };
    return tem;
  });

  const fetchRemote = async (query: ViewEvent): Promise<ProcessedEvent[]> => {
    const result = await getEventos(query);

    if (result.data) {
      return result.data as ProcessedEvent[];
    } else {
      enqueueSnackbar(result.error, {
        variant: "error",
        anchorOrigin: {
          horizontal: "right",
          vertical: "bottom",
        },
      });
      return [];
    }
  };

  const handleConfirm = async (
    event: ProcessedEvent,
    action: EventActions
  ): Promise<ProcessedEvent> => {
    console.log(event);

    if (action === "edit") {
      console.log(action);

      await editEvent(event);
    } else if (action === "create") {
      await addEvent(event);
    }

    return event;
  };

  const handleDelete = async (deletedId: string): Promise<string> => {
    await deleteEvent(deletedId);
    return deletedId;
  };

  if (load) {
    return <MyCircularProgress />;
  } else {
    return (
      <>
        <Item>
          <Scheduler
            deletable={true}
            fields={[
              {
                name: "clientId",
                type: "select",
                // Should provide options with type:"select"
                options: lisClient,
                config: {
                  label: "Cliente",
                  required: true,
                  errMsg: "Seleccione un cliente",
                },
              },
              {
                name: "color",
                type: "select",
                // Should provide options with type:"select"
                options: colors,
                config: {
                  label: "Color",
                },
              },
              {
                name: "Description",
                type: "input",
                //default: "Default Value...",
                config: { label: "Detalles", multiline: true, rows: 4 },
              },
            ]}
            translations={{
              navigation: {
                month: "Mes",
                week: "Semana",
                day: "Dia",
                today: "Hoy",
              },
              form: {
                addTitle: "Agregar Evento",
                editTitle: "Editar Evento",
                confirm: "Confirmar",
                delete: "Eliminar",
                cancel: "Cancelar",
              },
              event: {
                title: "Título",
                start: "Inicio",
                end: "Fin",
                allDay: "Todo el dia",
              },
              moreEvents: "More...",
              loading: "Cargando...",
            }}
            onConfirm={handleConfirm}
            getRemoteEvents={fetchRemote}
            onDelete={handleDelete}
          />
        </Item>
      </>
    );
  }
}
