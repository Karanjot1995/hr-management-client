import './App.css';
import React,{useState, useReducer, useEffect} from "react";
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
const url = `https://hr-server-366909.uc.r.appspot.com`;
// const url = `http://localhost:8080`;

function App() {
  const [token, setToken] = useState({name:''})
  const [data, setData] = useState({})
  
  async function fetchData(){

    // const headers = {
    //   "Accept": "application/json",
    //   "Content-Type": "application/json"
    // }
    // const res = await axios(url)
    // console.log(res.data)
    // await fetch(url).then(res=>res.json()).then(data=>console.log(data))
  }
  useEffect(() => {
    setToken(localStorage.getItem('token'))
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
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/sign-up" element={<Signup/>}/>
        </Routes>        
      </div>
    );
  }
}

export default App;
