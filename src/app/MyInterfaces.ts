

export interface Client {
    id: string,
    name: string ,
    lastName: string ,
    email: string ,
    phone: string,
    createdAt: string,
    updatedAt: string
};

export interface Eventcalendar {
    id: string,
    clientId: string,
    name:string,
    dataInit: string,
    dataEnd: string,
    description: string
    createdAt: string,
    updatedAt: string
}

export interface PropModal  {
    open: boolean,
    loadingSubmit?: boolean,
    handleOpenModal: () => void,
    handleSubmit?: () => void
  };