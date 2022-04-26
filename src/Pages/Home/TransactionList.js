import React from 'react'
import { UseFireStore } from '../../Hook/UseFireStore'
import styles from "./Home.module.css"

const TransactionList = ({doc}) => {
    
    const { deleteDocument } = UseFireStore('transactions') 
  return (

    <ul className={styles.transactions}>

        {doc.map(item => (
            <li key = {item.id}>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.amount}>$ {item.amount}</p>
                <button onClick={() => deleteDocument(item.id)} >x</button>
            </li>
        ))}

    </ul>
  )
}

export default TransactionList