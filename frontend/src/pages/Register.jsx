import {useState} from"react";

function Register(){
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[msg,setMsg]=useState("");

  const submit=async(e)=>{
    e.preventDefault();

    const res=await fetch("http://localhost:5000/api/auth/register",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({name:name,email:email,password:password})
    });

    const data=await res.json();
    
    setMsg(data.msg);
  };

  return(
    <div style={{width:"300px",margin:"20px auto",display:"flex",flexDirection:"column",gap:"10px"}}>

      <h2>Register</h2>

      <form onSubmit={submit} style={{display:"flex",flexDirection:"column",gap:"10px"}}>

        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name"/>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>

        <button type="submit">Register</button>

      </form>

      <p>{msg}</p>
    
    </div>
  );
}
export default Register;