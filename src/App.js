import './App.css';
import React,{useState, useReducer, useEffect} from "react";
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Timesheet from './pages/Timesheet';
// import env from '../env.json'

const url = `https://hr-server-366909.uc.r.appspot.com`;
// const url = `http://localhost:8080`;

function App() {
  const [token, setToken] = useState({name:''})
  const [data, setData] = useState({})
  
  async function fetchData(){

  }
  useEffect(() => {
    setToken(localStorage.getItem('token'))
    // console.log(process.env.REACT_APP_HOST)
    fetchData()
  },[token]);

  if(token){
    return (
      <div className="App">
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/timesheet" element={<Timesheet/>}/>
        </Routes>
      </div>
    );

  }else{
    return (
      <div className="App">
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="*" element={<Login/>}/>
          <Route exact path="/sign-up" element={<Signup/>}/>
        </Routes>        
      </div>
    );
  }
}

export default App;
