import './App.css';
import React,{useState, useReducer, useEffect} from "react";
import axios from 'axios';

function App() {
  const [state, setState] = useState({name:''})
  const [data, setData] = useState({})
  
  async function fetchData(){
    const url = `http://34.170.76.69/`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err))
    // const res = await axios.get(url);
    // console.log(res.data)
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
