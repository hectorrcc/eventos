
export  interface ClientModel {
    id: string,
    name: string ,
    lastName: string ,
    email: string ,
    phone: string,
    createdAt?: string,
    updatedAt?: string
};

export const InitClient: ClientModel = {
    id: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
    createdAt: "",
    updatedAt: "",
  };