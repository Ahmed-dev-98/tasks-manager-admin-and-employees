import React from 'react'
import { Link } from 'react-router-dom'

const style = {
    container: `flex justify-end bg-gradient-to-l from-purple-500 to-purple-200 text-white py-1 `,
    li: `mx-1 bg-gray-800 rounded border px-3 pb-1`
}

function Navbar({ userData , setUserData}) {


    function logout(){
        localStorage.removeItem('token') 
        setUserData(null)
    }
    return <>
        <div >
            <ul className={style.container}>
                {!userData ?  <>
                <li className={style.li}>
                    <Link to='login'>Admin</Link>
                </li> 
                <li className={style.li}>
                    <Link to='employee'>Employee</Link>
                </li> </> 
                :
                userData.role === "user" ? <>
                <li className={style.li}>
                <Link to='login' onClick={logout}>logout</Link>
                </li>
                <li className={style.li}>
                <Link to=''>todo</Link>
                </li>
                </> 
                : 
                userData && userData.role === "admin" ? <>
                <li className={style.li}>
                <Link to='users' >employees sheet</Link>
                </li>
                                <li className={style.li}>
                                <Link to='register' >add new employee </Link>
                                </li>
                
                <li className={style.li}>
                <Link to='login' onClick={logout}>logout</Link>
                </li>
                </> :
                <>
                </>
                }

            </ul>

        </div>



    </>


}

export default Navbar