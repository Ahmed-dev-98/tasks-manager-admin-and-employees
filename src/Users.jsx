import React, {  useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import TodoAdmin from './TodoAdmin.jsx'


const style = {
    form: `flex justify-between pt-4`,
    input: `border p-2 w-full text-xl `,
    button: `border p-4 ml-2 bg-purple-500`,
}


function Users() {

    const [addInput, setAddInput] = useState(false)
    const [userSheet, setUserSheet] = useState([])

    useEffect(() => {

        getUsersSheet()

    }, [])




    const getUsersSheet = async () => {

        try {
            let { data } = await axios.get('https://todo-task-iti.onrender.com/api/v1/user/')
        if (data.check) {
            setUserSheet(data.check)
        }  else {
            setUserSheet([])
        }
        } catch (erorr) {
            console.log(erorr);
        }
       

    }





    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////

    function onDelete(id) {
        setUserSheet(userSheet.filter((user) => user._id !== id))
    }

    ////////////////////////////////////////////////////////


    const handleDelete = async (id) => {

        let token = localStorage.getItem('token')
        const config = {
            headers: {
                'content-Type': 'application/json',
                'token': `${token}`
            }
        }
            try {

               let{data} = await axios.delete(`https://todo-task-iti.onrender.com/api/v1/user/${id}`, config)
               if(data.message === "success") {
                console.log(data.message);
               }
            } catch (erorr) {
                console.log(erorr);
            }

    }


    function submitDelete(e) {

        e.preventDefault()
        let id = e.target.id
        handleDelete(id)
        onDelete(id)

    }

    const [elements, setElements] = useState(false)




    const [updateUserInfo, setUpdateUserInfo] = useState({
        _id: "",
        name: ""
    })
    function collectUpdateInfo(e) {
        let myUser = { ...updateUserInfo }
        myUser[e.target.name] = e.target.value
        setUpdateUserInfo(myUser)

    }
    let navigate = useNavigate()
    async function sendUpdate() {
        let adminToken = localStorage.getItem("token")
        if (adminToken) {
            const config = {
                headers: {
                    'content-Type': 'application/json',
                    'token': `${adminToken}`
                }
            }
            try{
            let { data } = await axios.put(`https://todo-task-iti.onrender.com/api/v1/user/${updateUserInfo._id}`, updateUserInfo, config)
            if (data.message === "sucess") {
                setElements(false)
                getUsersSheet()
                
            }} catch (erorr) {
                console.log(erorr);
            }
        } else {
        navigate('/login')
    }
}
    const submitUpdate = (e) => {
        e.preventDefault()

        sendUpdate()

    }
 

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const [employeeTodos, setEmployeeTodos] = useState([])

    const [wantUpdate, setWantUpdate] = useState(false)

    const [userID, setUserID] = useState("")


    async function getEmployeTodos() {
        let { data } = await axios.get(`https://todo-task-iti.onrender.com/api/v1/user/${userID}`)
        if (data.message === "success") {
            setEmployeeTodos(data.check)

        }
    }

    function submitTodos (e) {
        e.preventDefault()
        getEmployeTodos()
        setAddInput(!addInput)
    }

    const [task , setTask] = useState( {
        content : "",
        employ : ""
    })


    const addTask = async (e) => {
        e.preventDefault(e)
        console.log(task.content);
        if (task.content === "") {
        return   window.alert('invalid data type')
            
    } else {
            task.content = ""
            task.employ = userID
            let { data } = await axios.post('https://todo-task-iti.onrender.com/api/v1/todo', task)
            if(data.message === "success") {
                getEmployeTodos()
                getUsersSheet()
            e.target.reset()
            }
    
        }
    }
    function getContent (e){
    task.content = e.target.value
    }






    return <>
        <div className='flex justify-around pt-8'>

            < button onClick={() => { setWantUpdate(!wantUpdate) }} className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">update employes todos </button>
            < Link to={'/register'} className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " > add employee</Link>

        </div>

        {
            elements ? <div>
                <form onSubmit={submitUpdate} className='flex flex-col  items-center py-4 '>
                    <label className='font-bold text-white' htmlFor="name">New Name :</label>
                    <input
                        onChange={collectUpdateInfo}
                        placeholder='  you can get IDs from users sheet'
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="current"
                        required
                        className="block w-1/2 rounded-md border-0 py-1.5 mb-3 text-black font-semibold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                    <label className='font-bold text-white' htmlFor="_id ">please enter Employ ID:</label>
                    <input
                        onChange={collectUpdateInfo}
                        placeholder='  you can get IDs from users sheet'
                        id="_id"
                        name="_id"
                        type="text"
                        autoComplete="current"
                        required
                        className="block w-1/2 rounded-md border-0 py-1.5 mb-3 text-black font-semibold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                    <button className='bg-green-600 hover:bg-green-900 border-primary text-primary hover:bg-primary inline-block rounded border py-2 px-6 hover:text-black'>Submit Update</button>

                </form> </div>
                :
                ""
        }

        <div className='flex justify-center pt-8'>


            <table className="w-1/4 h-1/4 table-auto bg-gradient-to-b from-[#3e5151] to-[#decba4]">
                <thead className='bg-transparent text-black '>
                    <tr className="text-center">
                        <th
                            className="w-1/6 min-w-[160px]  border-b border-l border-[#E8E8E8] py-4 px-3 text-lg font-bold text-black lg:py-7 lg:px-4"
                        >
                            name
                        </th>
                        <th
                            className="w-1/6 min-w-[160px] border-b border-l border-[#E8E8E8] py-4 px-3 text-lg font-sold text-black lg:py-7 lg:px-4"
                        >
                            email
                        </th>
                        <th
                            className="w-1/6 min-w-[160px]  border-b border-l border-[#E8E8E8]  py-4 px-3 text-lg fontibold text-black lg:py-7 lg:px-4"
                        >
                            ID
                        </th>
                        <th
                            className="w-1/6 min-w-[160px]  border-b border-l border-[#E8E8E8]  py-4 px-3 text-lg fontibold text-black lg:py-7 lg:px-4"
                        >
                            Todos
                        </th>

                        <th
                            className=" w-1/6 min-w-[160px]  border-b border-l border-[#E8E8E8] py-4 px-3 text-lg font-bold text-black lg:py-7 lg:px-4"
                        >
                            update User
                        </th>
                        <th
                            className="w-1/6 min-w-[160px]  border-b border-l border-[#E8E8E8] py-4 px-3 text-lg font-bold text-black lg:py-7 lg:px-4"
                        >
                            delete User
                        </th>

                    </tr>
                </thead>

                {userSheet ? userSheet.map((user, index) =>

                    <tbody key={index} className=''>

                        <tr>
                            <td
                                className="text-dark border-b border-l border-[#E8E8E8]  py-5 px-2 text-center text-base font-medium"
                            >
                                {user.name}
                            </td>
                            <td
                                className="text-dark  border-b border-l border-[#E8E8E8]  py-5 px-2 text-center text-base font-medium"
                            >
                                {user.email}
                            </td>
                            <td
                                className="text-dark  border-b border-l border-[#E8E8E8]  py-5 px-2 text-center text-base font-medium"
                            >
                                {user._id}
                            </td>
                            <td
                                className="text-dark  border-b border-l border-[#E8E8E8]  py-5 px-2 text-center text-base font-medium"
                            >
                                <div className='flex justify-center items-center'>
                                    <span className='text-black '>{user.MyTodos.length}</span>
                                    <button onClick={() =>  {setWantUpdate(!wantUpdate) ; } } className=" hover:text-black text-blue-900 font-bold rounded py-2 px-3 underline ">
                                        manage</button>
                                </div>


                            </td>

                            <td
                                className="text-dark  border-b border-l border-[#E8E8E8]  py-5 px-2 text-center text-base font-medium"
                            >
                                <button onClick={() => { setElements(!elements) }} id={index} className="bg-yellow-500  border-primary text-primary hover:bg-primary inline-block rounded border py-2 px-6 hover:text-black">



                                    update
                                </button>
                            </td>
                            <td
                                className="text-dark  border-b border-l border-[#E8E8E8]  py-5 px-2 text-center text-base font-medium"
                            >
                                <button id={user._id} onClick={submitDelete} className="bg-red-600  border-primary text-primary hover:bg-primary inline-block rounded border py-2 px-6 hover:text-black">

                                    delete
                                </button>
                            </td>
                        </tr>

                    </tbody>) : <></>}


            </table>


        </div>
        <div className=''>

            {wantUpdate ? <form onSubmit={submitTodos} className='flex flex-col  items-center py-4 '>
                <label className='font-bold text-white' htmlFor="_id">employee id :</label>
                <input
                    onChange={(e) => { setUserID(e.target.value) }}
                    placeholder='  you can get IDs from users sheet'
                    id="_id"
                    name="_id"
                    type="text"
                    autoComplete="current"
                    required
                    className="block w-1/4 rounded-md border-0 py-1.5 mb-3 text-black font-semibold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button onClick={(e)=>{
                    if(e.target.value !== "")


                    setAddInput(!addInput)
                    setTimeout(() => {
                        setWantUpdate(!wantUpdate)
                        
                    }, 300);
                }
                    } className='bg-green-600  border-primary text-primary hover:bg-primary inline-block rounded border py-2 px-6 hover:text-black' >get Employee todo</button>
            </form> : ""
                
                } </div>
                <div className='flex justify-center'>

            <ul className="w-1/4">
            {addInput? <form className={style.form} onSubmit={addTask} >
                <input  onChange={getContent} type="text" placeholder=" add todo" name='content'

                    className={style.input } />
                <button  className={style.button }> <AiOutlinePlus size={30} /> </button>
            </form> : <></>}

                {employeeTodos.length>0 ? employeeTodos.map((todo, index) => {

                     return <TodoAdmin key={index} todo={todo} getEmployeTodos={getEmployeTodos} employeeTodos={employeeTodos} getUsersSheet={getUsersSheet} />
                    
                }) : ""}
            </ul>
                </div>
    
</>
            }
 
export default Users