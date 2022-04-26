import React, { useEffect, useState } from 'react'
import { UseFireStore } from '../../Hook/UseFireStore'

const TransactionForm = ({uid}) => {
    const [ name , setName ] = useState("")
    const [amount , setAmount] = useState("")
    
  const { addDocument , response} = UseFireStore('transactions')

    const handleSubmit =  (e) => {
        e.preventDefault();
        addDocument({
          uid,
          name, 
          amount
        })
        console.log(response.success)
    }

    //reset the form fields
    useEffect(() => {
      if (response.success) {
        setAmount("")
        setName("")
      }
    } , [response.success])

  return (
      <div>
          <h3>Add a Transaction</h3>
          <form onSubmit={handleSubmit}>
              <label>
                <span>Tranaction Name :</span>  
                <input 
                    type="text"
                    required    
                    value = {name}
                    onChange = { (e) => setName(e.target.value)}
                />
              </label>

            <label>
            <span>Amount ($) :</span>  
            <input 
                type="number"
                required    
                value = {amount}
                onChange = { (e) => setAmount(e.target.value)}
            />
            </label>

            <button className="btn">Add</button>

          </form>
      </div>
  )
}

export default TransactionForm