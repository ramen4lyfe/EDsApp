import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Table, Button, Col, Container, Form, Row } from 'react-bootstrap';
import moment from 'moment';
import CreateEmployeeModal from './modals/CreateEmployeeModal';
import UpdateEmployeeModal from './modals/UpdateEmployeeModal';
import { EmployeeContext } from '../components/context/EmployeeContext';



const EmployeeList = () => {
// const [employees, setEmployees] = useState([]);
const { employees, setEmployees } = useContext(EmployeeContext);
const [showCreateModal, setShowCreateModal] = useState(false);
const [showUpdateModal, setShowUpdateModal] = useState(false);
const [selectedEmployee, setSelectedEmployee] = useState({});
const [searchTerm, setSearchTerm] = useState('');

//use effect to show employee
// useEffect(() => {
//   axios.get("http://localhost:8000/api/employees")
//     .then((response) => {
//       console.log(response.data);
//       setEmployees(response.data);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }, []);

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
  if (!date) {
    return null;
  }
  return moment(date).format('MMMM DD, YYYY');
};

// search bar
const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    `${employee.firstName} ${employee.lastName} ${employee.preferredName} ${employee.genderName} ${employee.email} ${employee.cellPhone} ${employee.businessTitle}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <div className="row justify-content-center mt-2">
        <Col>
          <Form>
            <Form.Group as={Row} className="align-items-center">
              <Form.Label column sm="1">
                Search
              </Form.Label>
              <Col>
                <Form.Control
                  type="search"
                  placeholder="Search by name"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </Col>
              <Col sm="auto">
                <Button variant="primary" type="button">
                  Search
                </Button>
              </Col>
              <Col sm="auto">
                <Button
                  onClick={handleShowCreateModal}
                  className="btn-primary"
                >
                  Add New
                </Button>
                <CreateEmployeeModal show={showCreateModal} handleClose={handleCloseCreateModal} />

              </Col>
            </Form.Group>
          </Form>
          <Table
            striped
            bordered
            hover
            responsive
            size="md"
            className="mt-2"
            style={{ fontSize: '0.8rem' }}
          >
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
              {filteredEmployees.map((employee,index) => (
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
      </Col>
      </div>
    </Container>
  );
};

export default EmployeeList;
