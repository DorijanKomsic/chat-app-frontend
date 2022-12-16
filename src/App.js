import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Login from './pages/Login'
import Signup from "./pages/Signup";
import Navbar from "./components/Navigation"

function App() {
  return (
   <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/chat" element={<Chat />}/>
          </Routes>
   </BrowserRouter> 
  );
}

export default App;
