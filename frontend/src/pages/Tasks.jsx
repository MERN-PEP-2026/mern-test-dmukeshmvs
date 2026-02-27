import {useState,useEffect} from"react";

function Tasks(){
  const[tasks,setTasks]=useState([]);
  const[title,setTitle]=useState("");
  const[description,setDescription]=useState("");
  const token=sessionStorage.getItem("token");

    if(!token){
        return window.location="/login";
    }

  const load=async()=>{

    const res=await fetch("http://localhost:5000/api/tasks",{
      headers:{Authorization:"Bearer "+token}
    });

    const data=await res.json();
    
    setTasks(data);
  
};

  const create=async(e)=>{
    
    e.preventDefault();
    
    await fetch("http://localhost:5000/api/tasks",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:"Bearer "+token
      },

      body:JSON.stringify({title:title,description:description})
    });

    setTitle("");
    setDescription("");
    load();
  };

  const update=async(id)=>{

    await fetch("http://localhost:5000/api/tasks/"+id,{

      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        Authorization:"Bearer "+token
      },

      body:JSON.stringify({status:"completed"})

    });

    load();
  
};

  const remove=async(id)=>{
    await fetch("http://localhost:5000/api/tasks/"+id,{
      method:"DELETE",
      headers:{Authorization:"Bearer "+token}
    });
    load();
  };

  useEffect(()=>{
    load();
  },[]);

  return(
    <div style={{width:"400px",margin:"20px auto"}}>
      <h2>Tasks</h2>

      <form onSubmit={create} style={{display:"flex",flexDirection:"column",gap:"10px"}}>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title"/>
        <input value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description"/>
        <button type="submit">Create</button>
      </form>

      <div style={{marginTop:"20px"}}>
        {tasks.map(t=>
          <div key={t._id} style={{border:"1px solid #ccc",padding:"10px",margin:"10px 0"}}>
            <h4>{t.title}</h4>
            <p>{t.description}</p>
            <p>Status:{t.status}</p>

            <div style={{display:"flex",gap:"10px"}}>
              <button onClick={()=>update(t._id)}>Complete</button>
              <button onClick={()=>remove(t._id)}>Delete</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Tasks;