import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'



function Register() {
let navigate = useNavigate()
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        cPassword: ''
    })
    const [userError , setUserError] = useState('')

    function getUserData(e) {
        let myUser = { ...user }
        myUser[e.target.name] = e.target.value
        setUser(myUser)
    }

    const sendUserData =async ()=> { 
    let token = localStorage.getItem('token')
    if(user.password !== user.cPassword){

        setUserError('password dosnt match')
        setTimeout(() => {
            setUserError('')

        }, 3000);
       
    }else{

   
        const config = {
            headers : {
                'content-Type' : 'application/json' ,
                'token' : token
            }
        }
        try {
        let { data } = await axios.post('https://todo-task-iti.onrender.com/api/v1/auth/signUp', user , config)
        
        if (data.message === 'success') {
        navigate('/users') } 
        
         } catch (erorr) {
                        setUserError(erorr.response.data.message);
                        setTimeout(()=>{
                            setUserError("")
                         },3000)

        }
       
    }
    }



    function submitForm(e) {
        e.preventDefault()
        sendUserData()

    }



    return (



        <>

<div className="sm:mx-auto sm:w-full sm:max-w-sm ">
<form className="space-y-6 " onSubmit={submitForm} method="POST">
<div className="sm:mx-auto sm:w-full sm:max-w-sm ">

<h2 className="mt-4 text-center text-2xl font-bold leading-5 tracking-tight text-white">
    Add Employee
</h2>
</div>


    <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
            Employee Name
        </label>
        <div className="mt-2">
            <input
                onChange={getUserData}
                placeholder='  Employee Name'
                id="name"
                name="name"
                type="name"
                autoComplete="current"
                required
                className="block w-full rounded-md border-0 py-1.5 text-black font-semibold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </div>
    </div>

    <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
            Email address
        </label>
        <div className="mt-2">
            <input
                onChange={getUserData}
                placeholder='  your E-mail'
                id="email"
                name="email"
                type="email"
                autoComplete="current"
                required
                className="block w-full rounded-md border-0 py-1.5 text-black font-semibold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </div>
    </div>

    <div>
        <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                Password
            </label>

        </div>
        <div className="mt-2">
            <input
                onChange={getUserData}
                placeholder='  your password'
                id="password"
                name="password"
                type="password"
                autoComplete="current"
                required
                className="block w-full rounded-md border-0 py-1.5 text-black font-semibold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </div>
    </div>
    <div>
        <div className="flex items-center justify-between">
            <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-white">
                confirm password
            </label>

        </div>
        <div className="mt-2">
            <input
                onChange={getUserData}
                placeholder='  confirm your password'
                id="cPassword"
                name="cPassword"
                type="password"
                autoComplete="current"
                required
                className="block w-full rounded-md border-0 py-1.5 text-black font-semibold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </div>
    </div>

    <div>
        <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            Add
        </button>
    </div>
</form>


{userError.length > 1 ? <p className='bg-red-500 border-1-4 border-yellow-500 text-white py-2 my-4 text-center rounded-md' role='alert'><strong>{userError}</strong></p> : ""}

</div>





        </>
    )
}

export default Register