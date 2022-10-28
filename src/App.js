import './App.css';
import React,{useState, useReducer, useEffect} from "react";
import axios from 'axios';

function App() {
  const [state, setState] = useState({name:''})
  const [data, setData] = useState({})
  
  async function fetchData(){
    const url = `http://localhost:3001/`;
    const res = await axios.get(url);
    console.log(res.data)
  }
  useEffect(() => {
    fetchData()
  },[]);
  return (
    <div className="App">
      Test App
    </div>
  );
}

export default App;
