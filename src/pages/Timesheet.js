import React,{useState, useReducer, useEffect} from "react";
import DatePicker from "react-datepicker";
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import "react-datepicker/dist/react-datepicker.css";
import '../scss/home.scss';
import Row from "../components/Row";

function Timesheet() {
    const [user, setUser] = useState({});
    const [timesheet, setTimesheet] = useState([]);
    // const [hours, setHours] = useState(new Date());


    const getTimesheets = async () => {
      await fetch(`${process.env.REACT_APP_HOST}/api/timesheet`,{
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((response) => response.json())
      .then((data) => setTimesheet(data.timesheet));
    }

    useEffect(() => {
      let usr = JSON.parse(localStorage.getItem('user'))
      getTimesheets()
      setUser(usr)
    },[]);

    const formatDate = (date) => {
        var dt = new Date(date)
        let newdate = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
        return newdate
    }

    const addnewRow = () => {
        // console.log(this.state.children)
        return (<Row/>)
    }


    return (
        <div className="timesheet-data" >
          {/* <div>
            <button className="btn btn-secondary btn-toggle" id="btn-prev" onClick={() => this.previousMonth()}>Previous Month</button>
            <button className="btn btn-secondary btn-toggle" id="btn-current" onClick={() => this.currentMonth()}>Current Month</button>
          </div> */}
          
          <div className="user-timesheet pb-80">
            
            <table style={{ 'border-bottom': '1px solid #e0e0e0' }}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type of Work</th>
                  <th>Project Name</th>
                  <th>Department</th>
                  <th className="textbox-desc">Job description</th>
                  <th>Duration (Minutes)</th>
                  <th>Hours(auto)</th>
                </tr>
              </thead>
              <tbody id="table-body">
                {timesheet.map((row) =>

                  <tr className="table-row" id={`row-${row._id}`}>

                    <td className="first">
                      {/* {this.editableRow(row)} */}
                     
                      <input className="created-date" value={row.date} hidden disabled />
                      <input className="save-date" value={formatDate(row.date)} disabled />
                    </td>

                    <td>
                      <select className="select-work d-none" data-value={row.type_work} name="" id="edit-work" required disabled>
                        <option value="Billable">Billable</option>
                        <option value="Non-Billable">Non-Billable</option>
                        <option value="Leave">Leave</option>
                      </select>
                      <input className="temp-inp" value={row.type_work} disabled />

                    </td>


                    <td>
                      {/* <select className="edit-project d-none" data-value={row.project} name="" id="edit-project" required disabled>
                      </select> */}
                      <input className="temp-inp" value={row.project} disabled />
                    </td>


                    <td>
                      {/* <select className="edit-department" value={row.department} name="" id="edit-department" onChange={(e) => console.log('changed')} required disabled>
                        <option value="D1">D1</option>
                        <option value="D2">D2</option>
                        <option value="D3">D3</option>
                        <option value="D4">D4</option>
                      </select> */}
                      <input defaultValue={row.department} data-id={9} disabled/>
                    </td>


                    <td className="td-desc">
                      <textarea data-value={row.description} className="edit-description d-none" disabled />
                      <textarea className="temp-inp" value={row.description} disabled />
                    </td>


                    <td>
                      <input type="number" data-value={row.duration} className="edit-minutes d-none" disabled />
                      <input className="temp-inp" value={row.duration} disabled />
                    </td>

                    <td>
                      <input value={(row.duration/60).toFixed(2)} data-id={8} className="edit-hours" disabled />
                    </td>


                  </tr>

                )}
                <Row/>

              </tbody>


            </table>
          </div>
         
          <div className="m-auto mt-3 bg-white p-2" id="add-row" style={{'position':'fixed', bottom:0, left:0, right:0}}>
            {/* <a className="fs-20" onClick={() => this.addRow()}>+ Add Row</a> */}
          </div>

        </div>
      );
}

export default Timesheet;
