import React,{useState, useReducer, useEffect} from "react";
import DatePicker from "react-datepicker";
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import "react-datepicker/dist/react-datepicker.css";
import '../scss/home.scss';


function Home() {
    const [markIn, setMarkIn] = useState(new Date());
    const [markOut, setMarkOut] = useState(new Date());
    const [user, setUser] = useState({});
    // const [hours, setHours] = useState(new Date());

    let markinTime = markIn.toLocaleTimeString()
    let markoutTime = markOut.toLocaleTimeString()
    var nowDate = markIn; 
    var date = (nowDate.getMonth()+1)+'/'+nowDate.getDate()+'/'+nowDate.getFullYear(); 
    // let hrs = 
    console.log(markinTime, markoutTime)
    useEffect(() => {
      let usr = JSON.parse(localStorage.getItem('user'))
      setUser(usr)
    },[]);
//   let attn = {

//   }
  return (
    <div className="App">
      <p className="text-center mt-3">Employee Name:{user.first_name} {user.last_name}</p>
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
                // ref={(c) => this._markin = c}
                dateFormat="dd/MMM/yyyy h:mm aa"
                id="date-time"
              />
              {/* <img className="calendar-icon" src='calendar.png' onClick={this.openMarkinCal} /> */}

              <div>
                <button id="markin" type="submit" className="m-3 btn btn-primary">Mark In</button>
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
                // ref={(c) => this._markout = c}
                dateFormat="dd/MMM/yyyy h:mm aa"
                id="date-time"
              />
              {/* <img className="calendar-icon" src='calendar.png' onClick={this.openMarkoutCal} /> */}
              <div>
                <button id="markout" type="submit" className="m-3 btn btn-primary">Mark Out</button>
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
                <tr>
                  <th className="one">{date}</th>
                  <th>{markinTime}</th>
                  <th>{markoutTime}</th>
                </tr>
                {/* {user.user && attendance ? this.state.attendance.map(attn =>
                  <tr className="table-row">
                    <td>
                      {attn.mdate}
                    </td>
                    <td>
                      {attn.markin}                    
                    </td>
                    <td>
                      {attn.markout}                    
                    </td>
                  </tr>
                ) : ''} */}
            </table>
            {/* <div className="download p-2 bg-white">
              <FiDownload size="20" className="mb-1 mr-1 download-icon"></FiDownload>
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-file"
                table="table-to-xls"
                filename="attendance"
                sheet="tablexls"
                buttonText="Download as XLS" />
            </div> */}
           
            {/* <a onClick={this.downloadFile}>Download excel</a> */}

          </div>
         
        </div>
        
      </div>
    </div>
  );
}

export default Home;
