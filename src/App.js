import './App.css';
import React,{useState, useReducer, useEffect} from "react";
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
// const url = `https://hr-server-366909.uc.r.appspot.com`;
const url = `http://localhost:8080`;

function App() {
  const [state, setState] = useState({name:''})
  const [data, setData] = useState({})
  
  async function fetchData(){

    // const headers = {
    //   "Accept": "application/json",
    //   "Content-Type": "application/json"
    // }
    // const res = await axios(url)
    // console.log(res.data)
    await fetch(url).then(res=>res.json()).then(data=>console.log(data))
  }
  useEffect(() => {
    fetchData()
  },[]);
  return (
    <div className="App">
      <div>
        <Navbar />
      </div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/sign-in" element={<Login/>}/>
          <Route exact path="/sign-up" element={<Signup/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
