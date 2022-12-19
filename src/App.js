import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from './pages/Login'
import Signup from "./pages/Signup";
import Navigation from "./components/Navigation"
import { useSelector } from "react-redux";

function App() {

  const user = useSelector(state => state.user);

  return (
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
  );
}

export default App;
