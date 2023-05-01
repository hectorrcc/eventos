import {useRoutes} from 'react-router-dom'
import { rutas} from './MyRouters'


export default function Router() {
    return useRoutes(rutas)
};
