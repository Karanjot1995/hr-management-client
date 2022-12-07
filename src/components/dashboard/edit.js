import React, { useState } from 'react'
import Swal from 'sweetalert2';

function Edit({ employees, selectedEmployee, setEmployees, setIsEditing }) {

    const _id = selectedEmployee._id;

    const [first_name, setfirst_name] = useState(selectedEmployee.first_name);
    const [last_name, setlast_name] = useState(selectedEmployee.last_name);
    const [email, setEmail] = useState(selectedEmployee.email);
    const [salary, setSalary] = useState(selectedEmployee.salary);
    const [dob, setDob] = useState(selectedEmployee.dob);
    const[designation, setDesignation] = useState(selectedEmployee.designation)
    const[department, setDepartment] = useState(selectedEmployee.department)
    const[type, setType] = useState(selectedEmployee.type)



    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!first_name || !last_name || !email) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }

        const employee = {
            _id,
            first_name,
            last_name,
            email,
            salary,
            dob,
            designation,
            department,
            type
        };

        for (let i = 0; i < employees.length; i++) {
            if (employees[i]._id === _id) {
                employees.splice(i, 1, employee);
                break;
            }
        }
        //////////////////////////////////////////////////////
        let body = {employee}
        console.log(body)

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
        await fetch(`${process.env.REACT_APP_HOST}/api/user/edit`, opts)
        // .then(res=>res.json()).then(data=>console.log(data))
        ////////////////////////////////////////////////

        setEmployees(employees);
        setIsEditing(false);

        Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: `${employee.first_name} ${employee.last_name}'s data has been updated.`,
            showConfirmButton: false,
            timer: 1500
        });
    };

    return (
        <div className="small-container">
            <form onSubmit={handleUpdate}>
                <h1>Edit Employee</h1>
                <label htmlFor="first_name">First Name</label>
                <input
                    id="first_name"
                    type="text"
                    name="first_name"
                    value={first_name}
                    onChange={e => setfirst_name(e.target.value)}
                />
                <label htmlFor="last_name">Last Name</label>
                <input
                    id="last_name"
                    type="text"
                    name="last_name"
                    value={last_name}
                    onChange={e => setlast_name(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled
                />
                <label htmlFor="salary">Salary ($)</label>
                <input
                    id="salary"
                    type="number"
                    name="salary"
                    value={salary}
                    onChange={e => setSalary(e.target.value)}
                />
                <label htmlFor="dob">dob</label>
                <input
                    id="dob"
                    type="date"
                    name="dob"
                    value={dob}
                    onChange={e => setDob(e.target.value)}
                />
                <label htmlFor="Designation">Designation</label>
                <input
                    id="designation"
                    type="text"
                    name="designation"
                    value={designation}
                    onChange={e => setDesignation(e.target.value)}
                />
                <label htmlFor="type">Type</label>
                <input
                    id="type"
                    type="text"
                    name="type"
                    value={type}
                    onChange={e => setType(e.target.value)}
                />

                <label htmlFor="department">Department</label>
                <input
                    id="department"
                    type="text"
                    name="department"
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                />


                <div style={{ marginTop: '30px' }}>
                    <input type="submit" value="Update" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => setIsEditing(false)}
                    />
                </div>
            </form>
        </div>
    );
}

export default Edit