import React, { useState } from 'react'
import { UseLogin } from '../../Hook/UseLogin'
import styles from "./Login.module.css"

const Login = () => {

    const [email, setEmail] = useState("")
    const [password , setPasswrod] = useState("")

    // use UseLogin Hook use

    const { Login , error , isPending} = UseLogin();


    const handleSubmit = (e) => {
        e.preventDefault()

        Login(email, password)
    }

  return (

        <form onSubmit={handleSubmit} className={styles['login-form']}>
            <h2>Login</h2>

            <label>
                <span>Email:</span>
                <input 
                    type="email" 
                    value={email}
                    onChange = { (e) => setEmail(e.target.value)}
                    required
                />
            </label>

            <label>
                <span>Passwrod:</span>
                <input 
                    type="password" 
                    value={password}
                    onChange = { (e) => setPasswrod(e.target.value)}
                    required
                />
            </label>
      
      
            {  !isPending &&    <button className="btn">Login</button>}

            { isPending && <button className='btn'>Loading ..</button>}

            {error && <p>{error}</p>}
        </form>

  )
}

export default Login