import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {BsFillTrashFill} from 'react-icons/bs'


const style = {
    li:`flex justify-between bg-slate-200 p-4 my-2 capitalize` ,
    liComplete:`flex justify-between bg-slate-400 p-4 my-2 capitalize` ,
    row:'flex w-full justify-between',
    text : `ml-2 cursor-pointer`,
    textComplete : `ml-2 cursor-pointer line-through`,
    button:`cursor-pointer flex item-center`
}

function TodoAdmin({todo , getEmployeTodos , getUsersSheet }) {


  useEffect(() => {
  }, [])

function submitDelete (e){
  e.preventDefault()
  deleteTodo()
}


const [erorr, setErorr] = useState("")


const updateTask = async()=>{

  let {_id} = todo
  let body = !todo.completed

  try {

  let {data} = await axios.put(`https://todo-task-iti.onrender.com/api/v1/auth/update/${_id}/${body}`)

  if (data.message  === "success") {
    getEmployeTodos()
}} catch (erorr) {
  setErorr(erorr.message + " server erorr or wrong ID")
  setTimeout(() => {
      setErorr("")
  }, 3000);
} 
}

  

const deleteTodo = async()=>{

  let {_id} = todo

  try {
    let {data} = await axios.delete(`https://todo-task-iti.onrender.com/api/v1/auth/delete/${_id}`)
    if (data.message  === "success") {
      getEmployeTodos()
      getUsersSheet()
      setErorr("sss")

    }
  } catch (erorr) {
    console.log(erorr.response.data.message);
    setErorr(erorr.response.data.message)
    setTimeout(() => {
      setErorr("")
    }, 4000);
  }


 
}

  return <>
    
    <li className={todo.completed ? style.liComplete : style.li}> 

    <div className={style.row}> 
    <input onChange={ updateTask} type='checkbox' checked={todo.completed ? 'checked' : '' }  /> 
    <p onClick={ updateTask} className={todo.completed? style.textComplete : style.text}>{todo.content}</p>
    <button  onClick={submitDelete} ><BsFillTrashFill size={30}/></button>
    
    </div>
    </li> 
    {erorr.length > 5 ? 
                
                
                <p className='bg-red-500 border-1-4 border-yellow-500 text-white py-2 my-4 text-center rounded-md' role='alert'><strong>{erorr}</strong></p> : ""}



    
  </>
}

export default TodoAdmin