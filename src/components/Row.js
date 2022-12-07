import React,{useState, useReducer, useEffect} from "react";
import DatePicker from "react-datepicker";
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'



function Row() {
    const [startDate, setStartDate] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [typeWork, setTypeWork] = useState('');
    const [project, setProject] = useState('');
    const [department, setDepartment] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [hours, setHours] = useState('');
    
    const [row, setRow] = useState({
        date: new Date(),
        typeWork: 'Billable',
        project:'A',
        department:'D1',
        description:'',
        duration:'',
        hours:''
    });
    const handleChange = e => {
        setRow(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    };

    const submit = async () => {
      // console.log(markinTime)
      let body = row

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

    await fetch(`${process.env.REACT_APP_HOST}/api/timesheet`, opts).then(res=>{
      if(res.status==200){
          window.location.reload()
          return res.json()
      }else{
          alert('Incorrect email or password!')
      }
      }).then(data=>console.log(data))
    }


    useEffect(() => {
      let usr = JSON.parse(localStorage.getItem('user'))
    //   setUser(usr)
    },[]);

    return (
      <>
        <tr className="table-row" id={`row-${'keyValue'}`}>

          <td className="first">
            {/* <a id={`edit-${row._id}`} className="edit-data d-none" onClick={() => editData(this.props.key)}>Edit</a> */}
            {/* <a id={`edit-${row._id}`} className="dalete-row" style={{ 'position': 'absolute', top: 0, left: '45px' }} onClick={() => deleteRow(row,this.props)}>/Delete</a> */}

            <DatePicker
                selected={row.date} 
                name='date'
                onChange={(date) => handleChange(date)} 
                dateFormat="dd/MM/yyyy"
                className="save-date m-auto"
            />
            {/* <img className="calendar-icon" style={{top:'13px',right:'10px'}} src='calendar.png'/> */}
            <input value={date} className="created-date" hidden disabled />

          </td>

          <td>
            <select className="select-work" value={row.typeWork} onChange={(val)=>handleChange(val)}  name="typeWork" id="edit-work" required>
              <option selected disabled="disabled">Select</option> 
              <option value="Billable">Billable</option>
              <option value="Non-Billable">Non-Billable</option>
            </select>
          </td>


          <td>
            <select className="edit-project" value={row.project} onChange={(val)=>handleChange(val)} defaultValue="Select" name="project" id="edit-project" required>
              {/* <option selected disabled="disabled">Select</option>  */}
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D Training">D</option>
            </select>
          </td>

          <td>
            <select className="edit-department" value={row.department} onChange={(val)=>handleChange(val)} name="department" id="edit-department" required >
              {/* <option selected disabled="disabled">Select</option> */}
              <option value="D1">D1</option>
              <option value="D2">D2</option>
              <option value="D3">D3</option>
              <option value="D4">D4</option>
            </select>
              {/* <input className="edit-department" name="" id="edit-department" value={row.department}  disabled /> */}

          </td>

          <td className="td-desc"><textarea value={row.description} name='description' onChange={(val)=>handleChange(val)} placeholder="Enter description..."  data-id={6} className="edit-description" required/></td>


          <td><input type="number" placeholder="Enter Duration" value={row.duration} name="duration" onChange={(val)=>handleChange(val)} data-id={7} className="edit-minutes" required/></td>


          <td>
          <input id="save" onClick={submit} type="submit" className="bg-white text-primary" value="Save"/>
          </td>


        </tr>

     </>
    );
}

export default Row;