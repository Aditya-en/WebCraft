import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import WebsiteBuilder from "./WebsiteBuilder";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { useState } from "react";
import PrivateRoute from "./components/PrivateRoute";




function App() {

  const [isloggedin,setisloggedin]=useState(false)
  const [email, setEmail] = useState('');

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login setisloggedin={setisloggedin}  setEmail={setEmail}/>}/>
          <Route path='/signup' element={<Signup setisloggedin={setisloggedin} setEmail={setEmail}/>}/>
          
          <Route path='/dashboard' element={
          <PrivateRoute isloggedin={isloggedin}>
            <Dashboard email={email}/>
          </PrivateRoute>
          }/>

          <Route path='/builder' element={
          <PrivateRoute isloggedin={isloggedin}>
            <WebsiteBuilder/>
          </PrivateRoute>
          }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
