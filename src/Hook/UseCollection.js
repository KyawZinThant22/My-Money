import { useState , useEffect, useRef} from "react"
import { projectFireStore } from "../firebase/config";

export const useCollection = (collection , _query , _orderBy) => {
    

    const [ document , setDocument] = useState(null)
    const [error , setError] = useState(null)

//if we dont use useRef  => infinite loop will occur
// query and orderby are array and is "different" in every function call

    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect(() => {
        let ref = projectFireStore.collection(collection)
        
        if (query) {
            ref = ref.where(...query)
        }

        if ( orderBy) {
            ref = ref.orderBy(...orderBy)
        }

        const unsub = ref.onSnapshot(snapshot => {
            let results = [];
            snapshot.docs.forEach((item) => {
                results.push ({...item.data() , id  : item.id})
            })

            //update the state
    
            setDocument(results)
            setError(null)

        }, (err) => {
            setError("Could not fetch the data")
            console.log(err.message);
        })
        

//clean up function
        return () => {
           unsub();
        };
    }, [collection]);

    return {document , error}

}

