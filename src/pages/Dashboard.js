import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Header from '../components/dashboard/header';
import List from '../components/dashboard/list';
import Add from '../components/dashboard/add';
import Edit from '../components/dashboard/edit';
import '../scss/dashboard.scss';



function Dashboard() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const getUsers = async () => {
        let opts = {
            method: "GET",
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token'),
            Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        await fetch(`${process.env.REACT_APP_HOST}/api/users`, opts)
        .then(res=>res.json()).then(data=>{
            console.log(data)
            setEmployees(data.users)
        })
    }

    useEffect(()=>{
        getUsers()
    },[])

    
    const handleEdit = (_id) => {
        const [employee] = employees.filter(employee => employee._id === _id);

        setSelectedEmployee(employee);
        setIsEditing(true);
    }

    const handleDelete = async(_id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(async (result) => {
            if (result.value) {
                const [employee] = employees.filter(employee => employee._id === _id);
                
                let opts = {
                    method: "POST",
                    body:JSON.stringify({_id}),
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'x-access-token': localStorage.getItem('token'),
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                }
                await fetch(`${process.env.REACT_APP_HOST}/api/user/delete`, opts)

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${employee.first_name} ${employee.last_name}'s data has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });

                setEmployees(employees.filter(employee => employee._id !== _id));
            }
        });
    }
    if(!employees){
        return(
            <div className='mt-5'>
                No Data to show.
            </div>
        )
    }


    return (
        <div className='container'>
            {/* List */}
            {!isAdding && !isEditing && (
                <>
                    <Header
                        setIsAdding={setIsAdding}
                    />
                    <List
                        employees={employees}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </>
            )}
            {/* Add */}
            {isAdding && (
                <Add
                    employees={employees}
                    setEmployees={setEmployees}
                    setIsAdding={setIsAdding}
                />
            )}
            {/* Edit */}
            {isEditing && (
                <Edit
                    employees={employees}
                    selectedEmployee={selectedEmployee}
                    setEmployees={setEmployees}
                    setIsEditing={setIsEditing}
                />
            )}
        </div>
    )
}

export default Dashboard;