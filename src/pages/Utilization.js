import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import DatePicker from "react-datepicker";
import { calcBusinessDays } from "../components/calculate";

const { faker } = require('@faker-js/faker');
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
  
export const options = {
    responsive: true,
    plugins: {
    //   legend: {
    //     position: 'top' as const,
    //   },
        title: {
        display: true,
        // text: 'Chart.js Bar Chart',
    },
},
};
  
  
// import {HOST} from 

function Utilization (){
    const [token, setToken] = useState("");
    const [timesheet, setTimesheet] = useState([]);
    const [hours, setHours] = useState([]);
    const [users, setUsers] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [month, setMonth] = useState(new Date());
    const [reportType, setReportType] = React.useState("monthly");
    const [labels, setLabels] = useState([])
    const [data, setData] = useState({})


    // const data = {
    //     labels,
    //     datasets: [
    //         {
    //         label: 'Dataset 1',
    //         data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
    //         backgroundColor: 'rgba(255, 99, 132, 0.5)',
    //         },
    //         {
    //         label: 'Dataset 2',
    //         data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
    //         backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //         },
    //     ],
    // };

    const fetchData = async() =>{
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
          .then((data) => {
            setTimesheet(data.timesheet)
        })
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
            setHours(data.hours)
        });
        await fetch(`${process.env.REACT_APP_HOST}/api/utilization`,{
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': localStorage.getItem('token'),
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
          .then((response) => response.json())
          .then((data) =>{
            let labels = []
            if(data.users){
                data.users.map(u=>{
                    labels.push(`${u.first_name} ${u.last_name}`)
                })
            }
            setLabels(labels)
            setUsers(data.users)
        })
    }

    function handleReportType(e){
        setReportType(e.target.value)
    }

    const getReport = () => {
        // let hours = 0
        let start, end, working_days, working_hrs;
        if(reportType=='monthly'){
            let current = new Date(month)
            start = new Date(current.getFullYear(), current.getMonth(), 1);
            end = new Date(start.getFullYear(), start.getMonth()+1, 0);
        }else{
            start = startDate;
            end = endDate
        }
        setStart(String(start).slice(0,16))
        setEnd(String(end).slice(0,16))
        working_days = calcBusinessDays(start,end)
        working_hrs = working_days*8;
        users.map(u=>{
            let billable_hrs = 0;
            let tot_hrs = 0;
            u.timesheet.filter(t=>{
                if(new Date(t.date)<=end && new Date(t.date)>=start){
                    if(t.type_work == "Billable"){
                        billable_hrs += Number((Number(t.duration)/60).toFixed(2))
                    }
                    tot_hrs += Number((Number(t.duration)/60).toFixed(2))
                    return t
                }
            })
            u.tot_hrs = tot_hrs
            u.working_hrs = working_hrs
            u.billable_hrs = billable_hrs
            u.billability = (billable_hrs/working_hrs)*100
            u.utilization = (tot_hrs/working_hrs)*100
        })

        let d = {
            labels,
            datasets: [
                {
                label: 'Billability',
                data: users.map((u) => u.billability),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                label: 'Utilization',
                data: users.map((u) => u.utilization),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        };
        setData(d)
        // setUsers(users)
        // console.log(users)
    }

    const changeStartDate = (date)=>{
        setStartDate(date)
        setEndDate(date)
    }

    useEffect(() => {
        fetchData()
        setToken(localStorage.getItem('token'))
    },[token]);

    return (
      <div>
        <div className="d-flex mt-5">
            <div className="col-5 m-auto ">

                <div className="d-flex align-items-center">
                    <div>
                        <select value={reportType} onChange={handleReportType} className="mr-3">
                            <option value={'monthly'}>Monthly</option>
                            <option value={'custom'}>Custom Dates</option>
                        </select>
                    </div>
                    {reportType=="custom" ?
                    <div className="d-flex">
                        <DatePicker
                        selected={startDate}
                        onChange={(date) => changeStartDate(date)}
                        showMonthDropdown
                        />
                        <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        showMonthDropdown
                        />
                    </div>
                    :
                    <div>
                        <DatePicker
                        selected={month}
                        onChange={(month) => setMonth(month)}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        showFullMonthYearPicker
                        showFourColumnMonthYearPicker
                        />
                    </div>
                    }
                </div>
                <div>Start: {start} , End: {end}</div>
                <button className="btn btn-primary mt-3" onClick={getReport}>Get Report</button>
            </div>

            <div className="m-auto col-7" style={{'width':"500px"}}>
                {Object.keys(data).length?
                <Bar options={options} data={data} />
                :''}
            </div>
        </div>
      </div>
    )
}

export default Utilization