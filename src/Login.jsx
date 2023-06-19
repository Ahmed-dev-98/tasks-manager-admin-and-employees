import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login({ saveUserData }) {

    let navigate = useNavigate()
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState("")

    function getUserData(e) {

        let myUserData = { ...user }
        myUserData[e.target.name] = e.target.value
        setUser(myUserData)
    }



    const login = async () =>{ try { 
        let { data } = await axios.post("https://todo-task-iti.onrender.com/api/v1/admin/login", user) 
    
    
    
    
        if (data.message === "success") {
            let token = data.token
            localStorage.setItem('token', token)
            saveUserData()
            navigate('/users')
        } } catch (erorr){
            setError(erorr.response.data.message)
            setTimeout(()=>{
                setError("")
             },3000)
         
        
        }

    }





    function submitLogin(e) {
        e.preventDefault()
        login()

    }









    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6  lg:px-8 bg-gray-900 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                    Admin Panal
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={submitLogin} method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-4 text-white">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={getUserData}
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-black font-bold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-4 text-white">
                                Password
                            </label>

                        </div>
                        <div className="mt-2">
                            <input
                                onChange={getUserData}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-black font-bold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>      
                
             {error.length > 0 ? 
                
                
                <p className='bg-red-500 border-1-4 border-yellow-500 text-white py-2 my-4 text-center rounded-md' role='alert'><strong>{error}</strong></p> : ""}


            </div>
        </div>
    )
}

export default Login