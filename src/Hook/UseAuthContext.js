import { useContext } from "react"
import { AuthContext } from "../context/AuthenContext"


export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if ( !context) {

            throw Error (' useAuthContext must be inside an AuthContextProvider')

    }
    
    return context;

}