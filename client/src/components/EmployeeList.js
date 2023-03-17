import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Col } from 'react-bootstrap';
import moment from 'moment'; 
import CreateEmployeeModal from './modals/CreateEmployeeModal';
import UpdateEmployeeModal from './modals/UpdateEmployeeModal';



const EmployeeList = () => {
const [employees, setEmployees] = useState([]);
// const [showModal, setShowModal] = useState(false);
const [showCreateModal, setShowCreateModal] = useState(false);
const [showUpdateModal, setShowUpdateModal] = useState(false);
const [selectedEmployee, setSelectedEmployee] = useState({});

//use effect to show employee
useEffect(() => {
  axios.get("http://localhost:8000/api/employees")
    .then((response) => {
      console.log(response.data);
      setEmployees(response.data);
    })
    .catch(err => {
      console.log(err);
    });
}, []);

const handleCloseCreateModal = () => setShowCreateModal(false);
const handleShowCreateModal = () => setShowCreateModal(true);

const handleCloseUpdateModal = () => setShowUpdateModal(false);
const handleShowUpdateModal = (employee) => {
  setSelectedEmployee(employee);
  setShowUpdateModal(true);
};

const handleUpdateEmployee = (updatedEmployee) => {
  axios.put(`http://localhost:8000/api/employees/update/${selectedEmployee._id}`, updatedEmployee)
    .then((response) => {
      console.log(response);
      setEmployees(employees.map((employee) => {
        if (employee._id === selectedEmployee._id) {
          return {
            ...employee,
            ...updatedEmployee
          }
        } else {
          return employee;
        }
      }));
      handleCloseUpdateModal(); // change this line
    })
    .catch((err) => {
      console.log(err);
    });
};

  
// Format the birthday using Moment.js
const formatDate = (date) => {
  return moment(date).format('MMMM DD, YYYY');
};

  return (
    <div className="container-fluid">
      <div className="row justify-content-center mt-2">
        <div className="col-0">
          <Table striped bordered hover responsive size="sm" style={{fontSize: '0.8rem'}} >
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Preferred Name</th>
                <th>Gender Name</th>
                <th>Birthday</th>
                <th>Email</th>
                <th>Cell Phone</th>
                <th>Business Title</th>
                <th>Hire Date</th>
                <th>Termination Date</th>
                <th>Promotion Date</th>
                <th>Active Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee,index) => (
                <tr key={employee._id}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.preferredName}</td>
                  <td>{employee.genderName}</td>
                  <td>{formatDate(employee.birthday)}</td>
                  <td>{employee.email}</td>
                  <td>{employee.cellPhone}</td>
                  <td>{employee.businessTitle}</td>
                  <td>{formatDate(employee.hirDate)}</td>
                  <td>{formatDate(employee.terminationDate)}</td>
                  <td>{formatDate(employee.promotionDate)}</td>
                  <td style={{ color: employee.isActive ? "green" : "red", fontWeight: "bold" }}>{employee.isActive ? "Active" : "Inactive"}</td>
                  <td className="d-flex justify-content-center">
                    <Button variant="warning" size="sm" onClick={() => handleShowUpdateModal(employee)} >
                      Update
                    </Button>
                    <UpdateEmployeeModal 
                    show={showUpdateModal} 
                    handleClose={handleCloseUpdateModal} 
                    employee={selectedEmployee} 
                    id={selectedEmployee._id} 
                    handleUpdateEmployee={handleUpdateEmployee} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button onClick={handleShowCreateModal} className="btn-primary mt-3">
            Add New Employee
          </Button>
          <CreateEmployeeModal show={showCreateModal} handleClose={handleCloseCreateModal} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
