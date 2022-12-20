import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from './pages/Login'
import Signup from "./pages/Signup";
import Navigation from "./components/Navigation"
import { useSelector } from "react-redux";
import { useState } from "react";
import { AppContext, socket } from "./context/appContext";

function App() {

  const user = useSelector(state => state.user);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMessage, setPrivateMessage] = useState({});
  const [newMessage, setNewMessage] = useState({});

  return (
    <AppContext.Provider value={(socket, members, setMembers, messages, setMessages, privateMessage, setPrivateMessage, newMessage, setNewMessage)}>
      <BrowserRouter>
        <Navigation />
          <Routes>
            <Route path="/" element={<Home />}/>
            {!user && (
              <>
                <Route path="/login" element={<Login />}/>
                <Route path="/signup" element={<Signup />}/>
              </>
            )}
          </Routes>
      </BrowserRouter> 
    </AppContext.Provider>
  );
}

export default App;
