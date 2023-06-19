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

function Todo({todo , getTodos }) {


  const [erorr, setErorr] = useState("")
  const [deleteErorr, setDeleteErorr] = useState("")

  useEffect(() => {
  }, [])


const updateTask = async()=>{

  let {_id} = todo
  let body = !todo.completed

  try {

  let {data} = await axios.put(`https://todo-task-iti.onrender.com/api/v1/auth/update/${_id}/${body}`)

  if (data.message  === "success") {
    getTodos()
}} catch (erorr) {
  setErorr(erorr.message + " server erorr or wrong ID")
  setTimeout(() => {
      setErorr("")
  }, 3000);
} 
}



  return <>
    
    <li className={todo.completed ? style.liComplete : style.li}> 

    <div className={style.row}> 
    <input onChange={ updateTask} type='checkbox' checked={todo.completed ? 'checked' : '' }  /> 
    <p onClick={ updateTask} className={todo.completed? style.textComplete : style.text}>{todo.content}</p>
    <button  onClick={()=>{
                    window.alert("u need admin permision")
                }}  ><BsFillTrashFill size={30}/></button>
    
    </div>

    </li> 


  </>
}

export default Todo