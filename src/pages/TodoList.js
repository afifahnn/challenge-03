import React, { useState } from 'react'
import { RenderList } from '../assets/components/RenderList.js'
import searchImg from '../assets/img/search.png'
import { data } from './data.js'

export const TodoList = () => {
  const [search, setSearch] = useState('')
  const [filterData, setFilterData] = useState(data)
  const [onSubmit, setOnSubmit] = useState(false)
  const [newTask, setNewTask] = useState('')

  const handleSearch =() => {
    const filteredData = data.filter((item) => {
      return search.toLowerCase() === '' ? item : item.task.toLowerCase().includes(search.toLowerCase())
    })
    setFilterData(filteredData)
  }

  const handleBtn = (type) => {
    let filteredData = []
  
    if (type === 'All') {
      filteredData = data
    } else if (type === 'Done') {
      filteredData = data.filter((item) => item.complete === true)
    } else if (type === 'Todo') {
      filteredData = data.filter((item) => item.complete === false)
    }
    setFilterData(filteredData)
  }

  const handleDelete = (itemId) => {
    const newTask = data.filter((task) => task.id !== itemId)
    setFilterData(newTask)
  }

  const renderList =()=>{
    return filterData.map((item) => {
      return <RenderList key={item.id} data={item} onDelete={() => handleDelete(item.id)}/>
    })
  }

  const handleDelDone = () => {
    const confirmed = window.confirm('Do you want to delete completed task?')
    if (confirmed) {
        const newTask = filterData.filter((task) => task.complete === false)
        setFilterData(newTask)
    }
  }

  const handleDelAll = () => {
    const confirmed = window.confirm('Do you want to delete all task?')
    if (confirmed) {
        const newTask = filterData.filter((task) => task.complete === "")
        setFilterData(newTask)
    }
  }

  const handleAddTask =() => {
    setOnSubmit(true)
  }

  const handleAddNewTask = () => {
    if (newTask.trim() !== '') {
      const newTaskItem = {
        id: Math.random().toString(),
        task: newTask,
        complete: false
      }
  
      const newData = [...filterData, newTaskItem];
      setFilterData(newData);
  
      setNewTask('');
      setOnSubmit(false);
    }
  }
  
  return (
    <div className='bg-cyan-800 max-sm:bg-slate-50 h-screen'>
      <div className='bg-cyan-800 px-60 py-7 max-sm:px-0 max-sm:py-0'>
        <div className='bg-slate-50 px-10 max-sm:px-5 py-5 sm:shadow-2xl sm:rounded-lg'>

          <p className='flex justify-center font-bold text-2xl '>Todo Search</p>

          {/* search input, button, add */}
          <div className='border-2 rounded-lg my-3 p-5'>
            <div className='flex mb-3 border-2 w-[60%] max-sm:w-[100%] rounded-sm h-8'>
              <img src={searchImg} alt="" className='w-8'/>
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search Todo...' className='placeholder:italic px-3 w-full border-transparent focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 bg-slate-50'/>
            </div>

            {/* button search dan add */}
            <div className='flex max-sm:flex-col w-[100%]'>
              <div className='bg-cyan-500 hover:bg-cyan-600 w-[60%] max-sm:w-[100%] h-8 flex justify-center items-center rounded-sm text-white'>
                <button onClick={handleSearch} className='w-full h-full'>Search</button>
              </div>

              <div className='bg-cyan-500 hover:bg-cyan-600 text-white w-[30%] max-sm:w-[100%] flex justify-center items-center rounded-sm ml-[10%] max-sm:mt-3 max-sm:h-8 max-sm:ml-0'>
                <button onClick={handleAddTask} className='w-full h-full'>Add new Task</button>
              </div>
            </div>
          </div>

          {onSubmit ? (
            <div className='border-2 rounded-lg mt-3 p-5'>
              <div className='flex rounded-sm h-8 w-[100%]'>
                <div className='w-[60%] border-2 flex justify-center items-center rounded-sm'>
                  <input type='text' value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder='Add new task...' className='placeholder:italic px-3 w-full h-full border-transparent focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 bg-slate-50 rounded-sm'/>
                </div>
                  
                <div className='bg-cyan-500 hover:bg-cyan-600 text-white w-[30%] flex justify-center items-center rounded-sm ml-[10%]'>
                <button onClick={handleAddNewTask} className='w-full h-full'>Add</button>
                </div>
              </div>
            </div>
          ) : null}

          {/* button filtering */}
          <div>
            <p className='flex justify-center font-semibold text-xl'>Todo List</p>
            <div className='flex w-[100%] h-8 justify-between my-3'>
              <div className='bg-cyan-500 hover:bg-cyan-600 text-white w-[30%] flex justify-center items-center rounded-sm'>
                <button onClick={() => handleBtn('All')} className='w-full h-full'>All</button>
              </div>
              <div className='bg-cyan-500 hover:bg-cyan-600 text-white w-[30%] flex justify-center items-center rounded-sm'>
                <button onClick={() => handleBtn('Done')} className='w-full h-full'>Done</button>
              </div>
              <div className='bg-cyan-500 hover:bg-cyan-600 text-white w-[30%] flex justify-center items-center rounded-sm'>
                <button onClick={() => handleBtn('Todo')} className='w-full h-full'>Todo</button>
              </div>
            </div>
          </div>

          {/* menampilkan list */}
          <div className='space-y-3 py-8'>
            {renderList()}
          </div>

          {/* button delete */}
          <div className='flex max-sm:flex-col gap-10 max-sm:gap-3 mt-2 mb-3'>
            <div className='bg-red-600 hover:bg-red-700 text-white w-[50%] max-sm:w-[100%] flex justify-center items-center rounded-sm h-8'>
              <button onClick={handleDelDone} className='w-full h-full'>Delete done tasks</button>
            </div>
            <div className='bg-red-600 hover:bg-red-700 text-white w-[50%] max-sm:w-[100%] flex justify-center items-center rounded-sm h-8'>
              <button onClick={handleDelAll} className='w-full h-full'>Delete all tasks</button>
            </div>
          </div>
        </div> 
      </div>
    </div>
    
  )
}