import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from "./Todo.jsx";
import axios from 'axios'
import jwtDecode from "jwt-decode";


const style = {
    bg: `h-screen w-full p-4 bg-gradient-to-t from-[#141e30] to-[#243b55] flex justify-center`,
    container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
    heading: `text-3xl text-center text-gray-800 p-2 font-bold`,
    form: `flex justify-between`,
    input: `border p-2 w-full text-xl`,
    button: `border p-4 ml-2 bg-purple-500`,
    todoContainer: `text-center`,
}

function System() {


    const [todos, setTodos] = useState([])
    const [task, setTask] = useState({
        content: "",
        employ: ""
    })
    const getTodos = async () => {
        let encodedToken = localStorage.getItem("userToken")
        let {userId} =  jwtDecode(encodedToken)
        try {
            let { data } = await axios.get(`https://todo-task-iti.onrender.com/api/v1/user/${userId}`)
            if (data.message === "success") {
                setTodos(data.check)
        }else{
            setTodos([])
        } } catch (erorr) {
            setErorr(erorr.message + " server erorr or invalid token")
            setTimeout(() => {
                setErorr("")
            }, 3000);
        } 
    }



    useEffect(() => {
        getTodos()


    }, [todos  ])

    function getContent(e) {

        task.content = e.target.value

    }

    const [erorr , setErorr] = useState("")

    //create 
    const addTask = async (e) => {
        e.preventDefault(e)
        if (task.content === "") {
                setTimeout(() => {
                setErorr("")
            }, 3000);    
            return   setErorr('cant assign empty todo ')

        } else {
            let encodedToken = localStorage.getItem("userToken")
            let { userId } = await jwtDecode(encodedToken)

            task["employ"] = userId
            try {
                let { data } = await axios.post('https://todo-task-iti.onrender.com/api/v1/todo', task)
                if (data.message === "success") {
                    setTask({
                        content: "",
                        employ: ""
                    })
                    e.target.reset()
                }
            }

            catch (erorr) {
                console.log(erorr);
            }
        }
    }
    return <> 

    
    <div className={style.bg}>
        <div className={style.container}>
            <h2 className={style.heading}>Todo list</h2>
            <form className={style.form} onSubmit={addTask} >
                <input onChange={getContent} type="text" placeholder=" add todo"
                    className={style.input} />
                <button className={style.button}> <AiOutlinePlus size={30} /> </button>
            </form>
            <ul className={style.todoContainer}>

                {todos ? todos.map((todo, index) => {

                    return <Todo key={index} todo={todo} getTodos={getTodos} />
                }) : ""}
            </ul>
            {erorr.length > 0 ? 
                
                
                <p className='bg-red-500 border-1-4 border-yellow-500 text-white py-2 my-4 text-center rounded-md' role='alert'><strong>{erorr}</strong></p> : ""}

        </div>
    </div>
    </>
}

export default System