import { useState } from 'react'
import './App.css'

function addTasks(tasks, text){
    const ids = tasks.map(task => task.id)
    const newTask = {id : Math.max(0, ...ids) + 1, task : text, done : false}

    return [...tasks, newTask]
}

function Review(){
  const [tasks, setTask] = useState([
    { id: 1, task : "kms", done : false }
  ])

  const [text, setText] = useState("")

  function handleSubmit(e){
    e.preventDefault()

    if (text.trim() === "") return 
    setTask(addTasks(tasks, text))
    setText("")
  }

  return(
    <>
    <form onSubmit={handleSubmit}>
      <label htmlFor="task-input">Today's task is</label>
      <input
        id="task-input"
        value={text}
        onChange={e => setText(e.target.value)}
       />
    <button type="submit">Add</button>
    </form>


    <ul>
      {tasks.map(task => (
      <li key= {task.id}>{task.task} is {String(task.done)}</li>
      ))}
    </ul>

    </>
  )

}

export default Review