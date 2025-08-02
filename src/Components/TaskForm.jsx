import React,{useState,useEffect} from 'react'

export default function TaskForm({onAdd,editTask,onUpdate}) {

    const [title,setTitle] = useState("")
    const [desc,setDesc] = useState("");

    useEffect(()=>{
        if(editTask){
            setTitle(editTask.title);
            setDesc(editTask.desc);
        }else{
            setTitle("");
            setDesc("");
        }
    },[editTask]);
    const handleSubmit = (e)=> {
            e.preventDefault();

            if (title.trim() === "" || desc.trim() === ""){
                alert("please fill the fields correctly")
            }else{
                    if(editTask) {
                        const updatedTask = {
                            ...editTask,
                            title : title,
                            desc : desc
                        }
                        onUpdate (editTask.id,updatedTask);
                    } else{
                    const newTask = {
                    title : title,
                    desc : desc,
                    completed : false,
                    }

                    onAdd(newTask)
                }

                
            }
            setTitle("");
            setDesc("");
            }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
        <input type="text" placeholder='Title of Task' value={title} onChange={(e)=>setTitle(e.target.value)} />
                <textarea type="text" placeholder='Description of Task' value={desc} onChange={(e)=>setDesc(e.target.value)} />
                <button type="submit"> {editTask ? "Update Task" : "Add Task"} </button>



    </form>
  )
}
