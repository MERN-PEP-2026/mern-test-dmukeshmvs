import{useState,useEffect}from"react";

function Tasks(){
  const[tasks,setTasks]=useState([]);
  const[title,setTitle]=useState("");
  const[description,setDescription]=useState("");
  const msg="";

  const fetchTasks=async()=>{
    const token=sessionStorage.getItem("token");
    const res=await fetch("http://localhost:5000/api/tasks",{
      headers:{Authorization:`Bearer ${token}`}
    });
    const data=await res.json();
    setTasks(data);
  };

  const addTask=async(e)=>{
    e.preventDefault();
    const token=sessionStorage.getItem("token");
    await fetch("http://localhost:5000/api/tasks",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({title:title,description:description})
    });
    setTitle("");
    setDescription("");
    fetchTasks();
  };

    const completeTask=async(id)=>{
    const token=sessionStorage.getItem("token");
    await fetch(`http://localhost:5000/api/tasks/${id}`,{
        method:"PATCH",
        headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json"
        },
        body:JSON.stringify({status:"completed"})
    });
    fetchTasks();
    };

  const deleteTask=async(id)=>{
    const token=sessionStorage.getItem("token");
    await fetch(`http://localhost:5000/api/tasks/${id}`,{
      method:"DELETE",
      headers:{Authorization:`Bearer ${token}`}
    });
    fetchTasks();
  };

  useEffect(()=>{fetchTasks();},[]);

  return(
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 pt-20 pb-5 flex justify-center">
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 p-8 animate-[fadeIn_0.6s_ease]">

        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Task Manager
        </h1>

        <form onSubmit={addTask} className="flex flex-col space-y-4 mb-8">
          
          <input
            className="p-3 rounded-lg border border-gray-300 bg-gray-100 outline-none text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder="Task Title"
          />

          <textarea
            className="p-3 rounded-lg border border-gray-300 bg-gray-100 outline-none text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            placeholder="Task Description"
          />

          <button
            className="p-3 rounded-lg bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 transition active:scale-95"
          >
            Add Task
          </button>

        </form>

        <div className="space-y-4">
          {tasks.map((task)=>(
            <div key={task._id} className="p-4 bg-white border border-gray-200 rounded-xl shadow flex justify-between items-center">
              
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {task.title}
                </p>
                <p className="text-gray-600">{task.description}</p>
                <p className="text-sm mt-1 font-medium text-gray-500">
                  Status: 
                  <span className={task.status==="completed"?"text-green-600 ml-1":"text-orange-600 ml-1"}>
                    {task.status}
                  </span>
                </p>
              </div>

              <div className="flex gap-3">
                {task.status!=="completed"&&(
                  <button
                    className="px-3 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                    onClick={()=>completeTask(task._id)}
                  >
                    Complete
                  </button>
                )}

                <button
                  className="px-3 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
                  onClick={()=>deleteTask(task._id)}
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
export default Tasks;