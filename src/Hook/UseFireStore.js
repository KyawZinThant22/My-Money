import { useEffect, useReducer, useState } from "react"
import { act } from "react-dom/test-utils"
import { projectFireStore, timeStamp } from "../firebase/config"

const InitialState = {
    document : null , 
    error : null,
    success : null,
    isPending : false
}

    const fireStoreReducer = (state , action ) => {
        switch (action .type){
        
            case ' IS_PENDING':
                return {isPending : true , document : null , success:null , error : null}
            case 'ADDED_DOCUMENT' :
                return { document: action.payload , error : null , success : true , isPending : null}
            case 'DELETE-DOCUMENT':
            return {document : null , error : null , success : null , isPending : null}
            case 'ERROR' : 
                return {document : null , error : action.payload , success : null , isPending : null}
            default : 
                return state
        }
    }

export const UseFireStore = (collection) => {

    const [response , dispatch ] = useReducer(fireStoreReducer , InitialState)
    const [isCancel , setIsCancel ] = useState(false)

    //collection ref

    const ref =projectFireStore.collection(collection)

    // only if dispatch is not cancelled

    const dispatchIfNotCancelled = (action) => {
        if ( !isCancel) {
            dispatch(action)
        }
    }
    
    //add a document

    const addDocument = async (doc) => {
        
        dispatch({type : 'IS_PENDING'})
        
        try {
            const createAt = timeStamp.fromDate(new Date())
            const addedDocument = await ref.add({...doc , createAt})
            dispatchIfNotCancelled({type : 'ADDED_DOCUMENT' , payload : addedDocument})

        }catch (err) {
            dispatchIfNotCancelled({type : 'ERROR' , payload : err.message})
        }
    }  
    
    //delete a document

    const deleteDocument = async (id) => {

        dispatch({type : 'IS_PENDING'})
        try {
            await ref.doc(id).delete()
            dispatchIfNotCancelled({type : 'DELETE_DOCUMENT'})
        }catch (err) {
            dispatchIfNotCancelled({type : 'ERROR'})
        }
    }
    
//clean up function
    useEffect(()=> {
        return () => {
            return setIsCancel(true)
        }
    } , [])
    
    return {response , addDocument ,deleteDocument}
}