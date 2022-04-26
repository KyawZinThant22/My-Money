import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./UseAuthContext"

 

 export const UseLogout = () => {
     //states
     const [ error , setError] = useState(null)
     const [isPending , setIsPending] = useState(false)
     const [IsCancel , setIsCancel] = useState(false)

     const { dispatch } = useAuthContext();

     const Logout = async () => {
         setError(null)
         setIsPending(true)

         //sign the user out

         try {
             const res = await projectAuth.signOut();

             //dispatch logout action 

             dispatch({type : 'LOGOUT'})

             if ( !IsCancel) {
                 setIsPending(false)
                 setError(null)
             }
         }catch (err) {
             if ( !IsCancel) {
                 setError(err.message)
                 setIsPending(false)
             }
         }
     }

     useEffect(()=> {
         return () => {
             return () => setIsCancel(true)
         }
     } , [])

     return { Logout , error , isPending}
 }