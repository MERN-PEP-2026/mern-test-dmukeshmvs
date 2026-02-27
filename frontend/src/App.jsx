import Navbar from "./components/Navbar";
import {Routes,Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";

function App(){
  return(
    <>
      <Navbar/>
      <div>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/tasks" element={<Tasks/>}/>
      </Routes>
      </div>
    </>
  );
}
export default App;