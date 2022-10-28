import './App.css';
import React,{useState, useReducer, useEffect} from "react";
import axios from 'axios';

function App() {
  const [state, setState] = useState({name:''})
  const [data, setData] = useState({})
  
  async function fetchData(){
    const url = `https://hr-server-366909.uc.r.appspot.com`;
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
    const res = await axios(url)
    console.log(res.data)
    // fetch('https://8080-cs-1053727390227-default.cs-us-central1-pits.cloudshell.dev')
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data)
    //   })
    //   .catch(err => console.log(err))
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
