import React, { useState } from 'react'
import edit from '../img/edit.png'
import edit2 from '../img/edit2.png'
import deleteImg from '../img/delete.png'

export const RenderList = (props) => {
    const [Complete, setComplete] = useState(props.data.complete)
    const [Task, setTask] = useState(props.data.task)
    const [OnEdit, setOnEdit] = useState(false)

    const holdDelete =() => {
      const confirmed = window.confirm('Do you want to delete this task?')
      if (confirmed) {
        props.onDelete()
      }
    }

  return (
    <div className='flex max-sm:flex-col max-sm:space-y-3 justify-between px-4 py-2 border-2 rounded-lg'>
        <div className={`${Complete ? "line-through text-red-700":""}`}>
            {OnEdit ? <input value={Task} onChange={(e)=>{setTask(e.target.value)}} className='border-transparent focus:outline-none focus:ring-0 w-200 h-full bg-slate-50'/> : <span>{Task}</span>}
        </div>
        <div className='flex max-sm:justify-end gap-3'>
            <input checked={Complete} type='checkbox' onChange={()=>{setComplete(!Complete)}}/>
            <button onClick={()=>{setOnEdit(!OnEdit)}}> {OnEdit ? <img src={edit2} className='w-5 hover:filter hover:brightness-50'/> : <img src={edit} className='w-5 hover:filter hover:brightness-50'/>} </button>
            <button onClick={holdDelete}> {props.onDelete ? <img src={deleteImg} alt="" className='w-4 hover:filter hover:brightness-50'/> : ""} </button>
        </div>
    </div>
  )
}
