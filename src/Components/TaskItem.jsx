import React from 'react'

export default function TaskItem({task,onDelete,onEdit,handleUpdateCompleted}) {


  const updateCompleted = ()=>{
    const updatetask = {...task,
      completed : !task.completed,
  }
  handleUpdateCompleted(task.id,updatetask);
}


  return (<>
    <li className='task-item'>
      <p><strong>{task.title}</strong> - {task.desc}</p>
      <div><button className={task.completed ? "Done" : "inProgress"} onClick = {updateCompleted}>{task.completed ? "Done" : "inProgress"}</button>
      <button className="edit" onClick={()=> onEdit(task)}>Edit</button>
      <button className="delete" onClick={()=> onDelete(task.id)}>Delete</button></div>
    </li>
    </>
  )
}
