import React, { useState } from 'react'
import { UseSignUp } from '../../Hook/UseSignUp';
import styles from "./SignUp.module.css"

const SignUp = () => {
    const [ email , setEmail ] = useState("")
    const [password, setPassword] = useState("");
    const [ DisplayName , setDisplayName] = useState ("")

    const { error  , SignUp , isPending} = UseSignUp()

    const handleSubmit = (e) => {
        e.preventDefault();

        SignUp(email , password , DisplayName)
    }


  return (
      <form onSubmit={handleSubmit} className = {styles['signup-form']}>
          <h2>Sign Up</h2>

            <label>
                <span>Email :</span>
                <input 
                    type="text" 
                    required
                    value={email}
                    onChange = { e => setEmail(e.target.value)}
                />
            </label>
          

            <label>
                <span>Password :</span>
                <input 
                    type="password" 
                    required
                    value={password}
                    onChange = { e => setPassword(e.target.value)}
                />
            </label>
            
        
            <label>
                <span>Display Name :</span>
                <input 
                    type="text" 
                    required
                    value={DisplayName}
                    onChange = { e => setDisplayName(e.target.value)}
                />
            </label>

            {  !isPending &&    <button className="btn">SignUp</button>}

            { isPending && <button className='btn'>Loading ..</button>}

            {error && <p>{error}</p>}
      </form>
  )
}

export default SignUp