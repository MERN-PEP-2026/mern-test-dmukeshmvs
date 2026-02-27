function Nav(){
  const logout=()=>{
    sessionStorage.clear();
    window.location="/login";
  };
  return(
    <div style={{padding:"10px",borderBottom:"1px solid #ccc",display:"flex",gap:"20px"}}>
      <a href="/tasks">Tasks</a>
      <a href="/login">Login</a>
      <a href="/register">Register</a>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
export default Nav;