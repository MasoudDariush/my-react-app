import React from 'react'
import TaskItem from './TaskItem'

export default function TaskList({tasks,onDelete,onEdit,handleUpdateCompleted}) {
  return (
    <ul className="task-list">

        {tasks.length === 0 ? (<p className='no-tasks'>No Tasks Yet</p>):(
            tasks.map((task)=>(
                <TaskItem key = {task.id} task = {task} onDelete = {onDelete} onEdit = {onEdit} handleUpdateCompleted = {handleUpdateCompleted}/>
            ))
        )}
    </ul>
  )
}
