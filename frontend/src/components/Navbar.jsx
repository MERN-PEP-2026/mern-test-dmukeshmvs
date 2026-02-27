import{Link,useLocation}from"react-router-dom";

function Navbar(){
  const{pathname}=useLocation();

  const activeLink="text-yellow-300 font-semibold";
  const baseLink="hover:text-yellow-200 transition";

  return(
    <div className="w-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-xl shadow-md border-b border-white/20 fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

        <h1 className="text-white text-xl font-semibold tracking-wide drop-shadow-md">
          Task Manager
        </h1>

        <div className="flex items-center gap-8 text-white font-medium">

          <Link to="/tasks"
            className={pathname==="/tasks"?activeLink:baseLink}>
            Tasks
          </Link>

          <Link to="/login"
            className={pathname==="/login"?activeLink:baseLink}>
            Login
          </Link>

          <Link to="/register"
            className={pathname==="/register"?activeLink:baseLink}>
            Register
          </Link>

          <Link to="/logout"
            className={pathname==="/logout"?activeLink:baseLink}>
            Logout
          </Link>

        </div>

      </div>
    </div>
  );
}
export default Navbar;