import{useState}from"react";

function Login(){
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[msg,setMsg]=useState("");

    const submit=async(e)=>{
    e.preventDefault();
    const res=await fetch("http://localhost:5000/api/auth/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email:email,password:password})
    });
    const data=await res.json();
    setMsg(data.msg);
    if(data.token){
        sessionStorage.setItem("token",data.token);
        window.location="/tasks";
    }
    };

  return(
    <div style={{width:"300px",margin:"20px auto",display:"flex",flexDirection:"column",gap:"10px"}}>
      <h2>Login</h2>

      <form onSubmit={submit} style={{display:"flex",flexDirection:"column",gap:"10px"}}>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
        <button type="submit">Login</button>
      </form>

      <p>{msg}</p>
    
    </div>
  );
}
export default Login;