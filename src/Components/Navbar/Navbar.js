import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../Hook/UseAuthContext'
import { UseLogout } from '../../Hook/UseLogOut'
import styles from "./Navbar.module.css"

const Navbar = () => {
    const { Logout } = UseLogout();
    const { user } = useAuthContext();
  return (

      <nav className={styles.navbar}>

          <ul>
              <li className={styles.title}><Link to = "/" >My Money</Link></li>

      { !user &&  (    
           <>
                <li>
                    <Link to = "/Login"> Login</Link>
                </li>
                <li>
                    <Link to = "/SignUp" >SignUp</Link>
                </li>
            </>
            )}

            {user && (
                <>
                 <li>
                     Hello , { user.displayName}
                 </li>

                 <button className="btn" onClick={Logout}>LogOut</button>
                
                </>
            )}
          </ul>


      </nav>
  )
}

export default Navbar