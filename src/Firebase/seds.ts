
import { Client } from "../app/MyInterfaces";
import { addClient } from "../Pages/Clientes/Clients.Fireabe";


const sedClients: Client[] = [
    {
        id: '',
        name: 'Hector',
        lastName: 'Cabrera Cruz',
        email: 'hector.rcc1993@gmail.com',
        phone: '5541991393152',
        createdAt:'',
        updatedAt: ''
    },
    {
        id: '',
        name: 'Lare',
        lastName: 'Baserio Marti',
        email: 'lare@gmail.com',
        phone: '5541991393152',
        createdAt:'',
        updatedAt: ''
    },
    {
        id: '',
        name: 'Lara',
        lastName: 'Cabrera Baserio ',
        email: 'lara@gmail.com',
        phone: '5541991393152',
        createdAt:'',
        updatedAt: ''
    },

] 

export const createClient = async()=>{
    sedClients.map( async (item)=>{
        try {
            await addClient(item)
            return "Crated Client OK"
        } catch (error) {
            console.error(error);
            
        }
       
    })
}


createClient();