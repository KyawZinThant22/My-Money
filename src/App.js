
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { authReducer } from './context/AuthenContext';
import { useAuthContext } from './Hook/UseAuthContext';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';

function App() {
  const { user , isAuthReady } = useAuthContext()
  
  return (
    <div className="App">
     
   {isAuthReady && ( <BrowserRouter>

        <Navbar/> 
        
      <Routes>

        <Route path='/' element = { user ? <Home/>  : <Navigate to = "/Login" />}  />
        
        <Route path='/Login' element = {!user ? <Login/> : <Navigate to = "/" /> }  />

        <Route path='/SignUp' element = {!user ? <SignUp/> :<Navigate to = "/" /> }  />

        <Route path = "*" element = { <p>There is no page related with this route</p>} />

      </Routes>
    
    </BrowserRouter>     )}   


    </div>
  );
}

export default App;


