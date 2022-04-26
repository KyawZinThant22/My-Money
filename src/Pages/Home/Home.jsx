import React from 'react'
import { useAuthContext } from '../../Hook/UseAuthContext'
import { useCollection } from '../../Hook/UseCollection'
import styles from "./Home.module.css"
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

const Home = () => {

  const { user } = useAuthContext();

  const { document , error} = useCollection(
    'transactions',
    ['uid' , '==' , user.uid],
    ['createAt' , 'desc']

  )

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p> }
       { document && <TransactionList doc = {document}/>}
      </div>
      <div className={styles.sidebar}>

        <TransactionForm uid = { user.uid}/>

      </div>
    </div>
  )
}

export default Home