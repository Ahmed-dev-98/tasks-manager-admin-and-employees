import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import LayOut from "./LayOut.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import System from "./System.jsx";
import NotFound from "./NotFound.jsx";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Authentication from "./Authentication.jsx";
import Users from "./Users.jsx";
import EmployeePanal from "./EmployeePanal.jsx";
import UpdateEmpTodo from "./UpdateEmpTodo.jsx";



function App() {

  useEffect(() => {
    if(localStorage.getItem('token') !== null ) {
      saveUserData()
    }
  
  }, [])
  

  const [userData , setUserData] = useState(null) 


  function saveUserData (){
    let encodedToken = localStorage.getItem('token') 
    let decodedToken = jwtDecode(encodedToken)

    setUserData(decodedToken)
    
  }
  let routers = createHashRouter([
    {path : '/' , element : <LayOut userData={userData} setUserData={setUserData} /> ,children : [
      { path : 'login' , element : <Login saveUserData={saveUserData}/> } , 
      { path : 'employee' , element : <EmployeePanal saveUserData={saveUserData}/> } , 
      { path : 'register' , element :<Authentication> <Register/></Authentication>  } , 
      { path : 'updateTodo' , element :<Authentication> <UpdateEmpTodo/></Authentication>  } , 
      { path : 'users' , element :<Authentication> <Users/> </Authentication>  } , 
      { index : true , element :<Authentication> <System saveUserData={saveUserData} userData={userData}/></Authentication>  } , 
      { path : '*' , element : <NotFound/> } 
    
    ]}
  ])
  
  return <RouterProvider router={routers} />;
}

export default App;
