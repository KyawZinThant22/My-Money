import { setSelectionRange } from "@testing-library/user-event/dist/utils"
import { useEffect, useState } from "react"
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./UseAuthContext"

export const UseSignUp = () => {
     
    //states
    const [ error , setError] = useState(null)
    const [isPending , setIsPending] = useState(false)
    const [isCancelled , setIscCancelled] = useState(false)

    const { dispatch } = useAuthContext();


    const SignUp = async (email, password , DisplayName ) => {
        setError(null)
        setIsPending(true)

        try {

            const res = await projectAuth.createUserWithEmailAndPassword(email , password) 

            if (!res) {
                throw new Error ( 'Could not create the new user')
            }

            //add display name to the user

            await res.user.updateProfile({displayName : DisplayName})

            //dispatch login action 

            dispatch({type : 'LOGIN' , payload: res.user})

            if (!isCancelled) {
                setError(null)
                setIsPending(false)
            }

        } catch (err) {
            if ( !isCancelled) {
                setError(err.message)
                console.log(err.message)
                setIsPending(false)
            }
        }
    }
//clean up function
    useEffect( () => {
        return () => {
            return setIscCancelled(true)
        }
    } , [])

    return { error , isPending  , SignUp}
}
