import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'




function UpdateEmpTodo() {
    let navigate = useNavigate()
    const [todo, setTodo] = useState({
        content: '',
        employ: ''
    })
    const [todoError , setTodoError] = useState('')

    function getTodoData(e) {
        let myTodo = { ...todo }
        myTodo[e.target.name] = e.target.value
        setTodo(myTodo)
    }

    const sendTodoData =async ()=> {
        let token = localStorage.getItem('token')
        const config = {
            headers : {
                'content-Type' : 'application/json' ,
                'token' : `${token}`
            }
        }
        
        let { data } = await axios.post('https://todo-task-iti.onrender.com/api/v1/todo', todo , config)
        
        if (data.message === 'success') {
        navigate('/users')
        } else {
            setTodoError(data.message)
        }

    }
    function submitForm(e) {
        e.preventDefault()
        sendTodoData()

    }



    return <>

<div className="sm:mx-auto sm:w-full sm:max-w-sm ">
<form className="space-y-6 " onSubmit={submitForm} method="POST">
<div className="sm:mx-auto sm:w-full sm:max-w-sm ">

<h2 className="mt-4 text-center text-2xl font-bold leading-5 tracking-tight text-white">
    Add Todo to Employee
</h2>
</div>


    <div>
        <label htmlFor="content" className="block text-sm font-medium leading-6 text-white">
            Todo
        </label>
        <div className="mt-2">
            <input
                onChange={getTodoData}
                placeholder='  content'
                id="content"
                name="content"
                type="name"
                autoComplete="current"
                required
                className="block w-full rounded-md border-0 py-1.5 text-black font-semibold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </div>
    </div>

    <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
            Employee ID
        </label>
        <div className="my-2">
            <input
                onChange={getTodoData}
                placeholder='  you can get IDs from users sheet'
                id="employ"
                name="employ"
                type="text"
                autoComplete="current"
                required
                className="block w-full rounded-md border-0 py-1.5 mb-3 text-black font-semibold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <Link className='text-blue-200 font-bold underline ' to={'/users'}>users Sheet</Link>
        </div>
    </div>

    <div>
        <button
        
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            sign Task
        </button>
    </div>
</form>
{todoError.length > 0 ? <p className='bg-red-500 border-1-4 border-yellow-500 text-white py-2 my-4 text-center rounded-md' role='alert'><strong>{todoError}</strong></p> : ""}

</div>

        </>
}

export default UpdateEmpTodo