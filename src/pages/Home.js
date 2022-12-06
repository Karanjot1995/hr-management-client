import React,{useState, useReducer, useEffect} from "react";
import DatePicker from "react-datepicker";
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import "react-datepicker/dist/react-datepicker.css";
import '../scss/home.scss';

function Home() {
    const [markIn, setMarkIn] = useState(new Date());
    const [markOut, setMarkOut] = useState(new Date());
    const [hrs, setHrs] = useState([])
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    // const [hours, setHours] = useState(new Date());
    let markinTime = markIn.toLocaleTimeString()
    let markoutTime = markOut.toLocaleTimeString()
    // var nowDate = markIn; 
    // var date = (nowDate.getMonth()+1)+'/'+nowDate.getDate()+'/'+nowDate.getFullYear(); 

    const getHours = async () => {
      await fetch(`${process.env.REACT_APP_HOST}/api/hours`,{
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((response) => response.json())
      .then((data) => {
        setHrs(data.hours)
      });
    }
    useEffect(() => {
      let usr = JSON.parse(localStorage.getItem('user'))
      getHours()
      setUser(usr)
    },[]);

    const clockin = async (e) =>{
      e.preventDefault()
      let markinTime = markIn.toLocaleTimeString()
      // console.log(markinTime)
      let body = {date:markIn, mark_in: markinTime}

      let opts = {
      method: "POST",
      body:JSON.stringify(body),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }

    await fetch(`${process.env.REACT_APP_HOST}/api/hours`, opts).then(res=>{
      if(res.status==200){
          window.location.reload()
          return res.json()
      }else{
          alert('Incorrect email or password!')
      }
      }).then(data=>console.log(data))
    }

    const clockout = async (e) =>{
      e.preventDefault()
      let markoutTime = markOut.toLocaleTimeString()
      // console.log(markinTime)
      let body = {date:markOut, mark_out: markoutTime}

      let opts = {
      method: "POST",
      body:JSON.stringify(body),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }

    await fetch(`${process.env.REACT_APP_HOST}/api/hours`, opts).then(res=>{
      if(res.status==200){
        window.location.reload()
        return res.json()
      }else{
          alert('Incorrect email or password!')
      }
      }).then(data=>console.log(data))
    }

    return (
      <div className="App">
        <p className="text-center mt-3">Employee Name: {user.first_name} {user.last_name}</p>
          <div id="attendace-page" className="d-md-flex" >
          <div className="mark-in">
            <h2 className="pb-3">Mark Attendance</h2>
            <div className="att-container">
              <form id="markin-form" className="mark-row pb-3 d-md-flex  align-items-center">
                <label className="mr-1"><b>Mark In: </b></label>
                <DatePicker
                  selected={markIn} 
                  onChange={(date) => setMarkIn(date)} 
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  injectTimes={[
                    setHours(setMinutes(new Date(), 1), 0),
                    setHours(setMinutes(new Date(), 5), 12),
                    setHours(setMinutes(new Date(), 59), 23)
                  ]}
                  dateFormat="dd/MMM/yyyy h:mm aa"
                  id="date-time"
                />
                {/* <img className="calendar-icon" src='calendar.png' onClick={this.openMarkinCal} /> */}
  
                <div>
                  <button id="markin" onClick={(e)=>clockin(e)} type="submit" className="m-3 btn btn-primary">Mark In</button>
                </div>
              </form>
              <form id="markout-form" className="mark-row pb-3 d-md-flex align-items-center">
                <label className="mr-1"><b>Mark Out: </b></label>
                <DatePicker
                  selected={markOut}
                  onChange={(date) => setMarkOut(date)} 
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  injectTimes={[
                    setHours(setMinutes(new Date(), 1), 0),
                    setHours(setMinutes(new Date(), 5), 12),
                    setHours(setMinutes(new Date(), 59), 23)
                  ]}
                  dateFormat="dd/MMM/yyyy h:mm aa"
                  id="date-time"
                />
                {/* <img className="calendar-icon" src='calendar.png' onClick={this.openMarkoutCal} /> */}
                <div>
                  <button id="markout" onClick={(e)=>clockout(e)} type="submit" className="m-3 btn btn-primary">Mark Out</button>
                </div>
              </form>
              
              
            </div>
          </div>
          
  
  
  
          <div className="mb-5" id="attendance">
            <h2 className="pb-3">Attendance Record</h2>
            <div>
              {/* <button className="btn btn-secondary btn-toggle w-50" id="btn-prev" onClick={() => this.previousMonth(user.user.attendance)}>Previous Month</button>
              <button className="btn btn-secondary btn-toggle  w-50" id="btn-current" onClick={() => this.currentMonth(user.user.attendance)}>Current Month</button> */}
            </div>
            {/* <table>
              
            </table> */}
            <div className="attendance-body">
              <table style={{ "table-layout": "fixed" }} id="table-to-xls">
                  <tr>
                    <th className="one">Date</th>
                    <th>Mark In</th>
                    <th>Mark Out</th>
                  </tr>
                  {hrs.map(d=>
                  <tr>
                    <th className="one">{d.date}</th>
                    <th>{d.mark_in}</th>
                    <th>{d.mark_out}</th>
                  </tr>
                  )}
              </table>
  
            </div>
            
          </div>
          
        </div>
      </div>
    );
}

export default Home;
