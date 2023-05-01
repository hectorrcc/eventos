import { User, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { LoginModel, Response } from "../Models";
import { errorApi } from "../../utils";

const auth = getAuth();

export const autentication = async (user: LoginModel)=>{
    const response: Response = {};
    try {
        const userCredential =  await signInWithEmailAndPassword(auth, user.email, user.password);
        console.log(userCredential)
        response.data = userCredential.user;
        return response
    } catch (error) {
        const newError = new Error(errorApi.failAuth).message
        response.error = newError;
        console.error(newError, error);
        return response;
        
    }
  
    
   
}
