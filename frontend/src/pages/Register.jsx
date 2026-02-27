import{useState}from"react";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-6">
      <div className="w-96 p-8 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 animate-[fadeIn_0.6s_ease]">

        <h1 className="text-center text-3xl font-semibold text-gray-800 mb-6">
          Create Account
        </h1>

        <form onSubmit={submit} className="flex flex-col space-y-4">

          <input
            className="p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Full Name"
          />

          <input
            className="p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email"
          />

          <input
            type="password"
            className="p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Password"
          />

          <button
            className="p-3 rounded-lg bg-blue-600 text-white text-center font-medium hover:bg-blue-700 transition active:scale-95 shadow-lg"
          >
            Register
          </button>

        </form>

        <p className="text-center text-gray-900 font-medium mt-4">{msg}</p>

      </div>
    </div>
  );
}
export default Register;