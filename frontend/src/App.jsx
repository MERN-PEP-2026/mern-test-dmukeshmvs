import{Routes,Route}from"react-router-dom";
import Register from"./pages/Register";
import Login from"./pages/Login";
import Tasks from"./pages/Tasks";
import Nav from "./components/Nav";

function App(){
  return(
    <>
    <Nav/>
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/tasks" element={<Tasks/>}/>
    </Routes>
    </>
  );
}
export default App;