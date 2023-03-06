import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import EmployeeModal from './modals/EmployeeModal';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);

useEffect(() => {
  axios.get("http://localhost:8000/api/employees")
    .then(res => {
      setEmployees(res.data);
    })
    .catch(err => {
      console.log(err);
    });
}, []);


  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-0">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Birthday</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.birthday}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button onClick={handleShow} className="btn-primary mt-3">
            Add Employee
          </Button>
          <EmployeeModal show={showModal} handleClose={handleClose} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;