import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Header'
import TaskForm from "./Components/TaskForm"
import TaskList from './Components/TaskList';

export default function App() {

  const [tasks,setTasks] = useState([]);
  const [editTask,setEditTask] = useState(null);
  const [filter, setFilter] = useState('All');
  const [currentPage,setCurrentPage] = useState(1);
  const [searchTeam, setSearchTeam] = useState('');

  


  useEffect(()=>{
    fetch('http://localhost:5000/tasks')
    .then((res)=> res.json())
    .then((data)=>{
      setTasks(data)
    })
    toast.success('لیست تسک ها بروز رسانی شدند');
  },[])

  useEffect(()=>{
    setCurrentPage(1);
  },[searchTeam])
    useEffect(()=>{
    setCurrentPage(1);
  },[filter])
  

  const handleAddTask = (newTask)=>{
    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
    .then((res)=> res.json())
    .then((data) => setTasks((prev) => [...prev, data]))
    toast.success('تسک با موفقیت اضافه شد');
  }

  const handleDelete = (id) => {

    fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE',
    })
    .then(()=>{
      setTasks((prev)=> prev.filter((task)=> task.id !== id))
    })
    toast.info('تسک با موفقیت حذف شد');
  }
  const handleUpdate = (id,updatedTask)=>{
    fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
  })
  .then((res) => res.json())
    .then((data) => {
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? data : task))
      );
      toast.success('تسک با موفقیت بروزرسانی شد');
      setEditTask(null);
    })}

    const handleUpdateCompleted = (id,updatetask)=>{
    fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatetask),
  })
  .then((res) => res.json())
    .then((data) => {
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? data : task))
      );
    })}

    const filteredTasks = tasks.filter((task) => {
      if (filter === 'All') {
        return true;
      } else if (filter === 'Completed' && task.completed) {
        return true;
      } else if (filter === 'Not Completed' && !task.completed) {
        return true;
      }
      return false;
    })
    ////////////////////////////Search title ////////////////////////////

      const searchedTasks = 
    filteredTasks.filter((task) => task.title.toLowerCase().includes(searchTeam.toLowerCase()));


    ////////////////////////////pagination////////////////////////////////
    const tasksPerPage = 5;

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = searchedTasks.slice(indexOfFirstTask,indexOfLastTask);



  return ( 
    <>
    <div className="container">
        <Header />
        <TaskForm onAdd={handleAddTask} editTask = {editTask} onUpdate={handleUpdate}/>
        <input className='search-input' type="text" placeholder='Search' value={searchTeam} onChange={(e)=> setSearchTeam(e.target.value)}/>
                <h2>List Of Tasks</h2>

        <div className="filter">
          <button className = {filter === 'All' ? "active" : ""} onClick={() => setFilter('All')}>All</button>
          <button className = {filter === 'Completed' ? "active" : ""} onClick={() => setFilter('Completed')}>Completed</button>
          <button className = {filter === 'Not Completed' ? "active" : ""} onClick={() => setFilter('Not Completed')}>Not Completed</button>
        </div>
        <TaskList tasks = {currentTasks} onDelete = {handleDelete} onEdit = {setEditTask} handleUpdateCompleted = {handleUpdateCompleted} />
        <div className="pagination">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  >
                    Prev
                </button>

                <span>Page {currentPage}</span>

                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      prev < Math.ceil(searchedTasks.length / tasksPerPage) ? prev + 1 : prev
                    )
                  }
                  disabled={currentPage >= Math.ceil(searchedTasks.length / tasksPerPage)}
                >
                  Next
                </button>
          </div>
                  
    </div>
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      pauseOnHover
      theme="colored"
    />    
    </>
          )}