import React, { useState, useContext } from 'react';
import { Modal, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { EmployeeContext } from '../context/EmployeeContext';

function CreateEmployeeModal ({ show, handleClose, setEmployees }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [preferredName, setPreferredName] = useState('');
    const [genderName, setGenderName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [cellPhone, setCellPhone] = useState('');
    const [businessTitle, setBusinessTitle] = useState('');
    const [hireDate, setHireDate] = useState('');
    const [terminationDate, setTerminationDate] = useState('');
    const [promotionDate, setPromotionDate] = useState('');
    const [isActive, setIsActive] = useState('');

    const [errors, setErrors] = useState('');

    // const { setEmployees } = useContext(EmployeeContext);


    // // code to auto update the list of employees
    // const handleEmployeeCreated = () => {
    // fetchEmployees();
    // };
    // const handleEmployeeUpdated = () => {
    // fetchEmployees();
    // };


    const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    axios.post("http://localhost:8000/api/employees", {
        firstName,
        lastName,
        preferredName,
        genderName,
        birthday,
        email,
        cellPhone,
        businessTitle,
        hireDate,
        terminationDate,
        promotionDate,
        isActive,
    })
        .then((response) => {
        console.log(email);
        console.log(response);
        setEmployees((prevEmployees) => [
            ...prevEmployees,
            response.data,
        ]);
        setFirstName("");
        setLastName("");
        setPreferredName("");
        setGenderName("");
        setBirthday("");
        setEmail("");
        setCellPhone("");
        setBusinessTitle("");
        setHireDate("");
        setTerminationDate("");
        setPromotionDate("");
        setIsActive("");
        handleClose();
        
        })
        .catch((err) => {
        console.log("Axios error:", err); // log error
        if (err.response && err.response.data && err.response.data.error && err.response.data.error.errors) {
            setErrors(err.response.data.error.errors);
        } else {
            // handle other types of errors
            console.log(err);
        }
        });
    };

return (
    <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton>
        <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
    <Modal.Body>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicFirstName" className='mb-4'>
                <InputGroup>
                    <InputGroup.Text>First Name<i className="fas fa-user"></i></InputGroup.Text>
                    <FormControl
                        type="text"
                        placeholder=""
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </InputGroup>
            </Form.Group>
            
            <Form.Group controlId="formBasicLastName" className='mb-4'> 
                <InputGroup>
                    <InputGroup.Text>Last Name<i className="fas fa-user"></i></InputGroup.Text>
                    <FormControl
                        type="text"
                        placeholder=""
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </InputGroup>
            </Form.Group>

            <Form.Group controlId="formBasicPreferredName" className='mb-4'>
                <InputGroup>
                    <InputGroup.Text>Preferred Name<i className="fas fa-user"></i></InputGroup.Text>
                    <Form.Control type="text" value={preferredName} onChange={(e) => setPreferredName(e.target.value)}/>
                </InputGroup>
            </Form.Group>

            <Form.Group controlId="formBasicGender" className='mb-4'>
                <InputGroup>
                    <InputGroup.Text>Gender Name</InputGroup.Text>
                        <Form.Select value={genderName} onChange={(e) => setGenderName(e.target.value)}>
                        <option value="">--Select gender--</option>
                        <option value="He/Him">He/Him</option>
                        <option value="She/Her">She/Her</option>
                        <option value="They/Them">They/Them</option>
                        </Form.Select>
                    </InputGroup>
            </Form.Group>

            <Form.Group controlId="formBasicBirthday" className='mb-4'>
                <InputGroup>
                    <InputGroup.Text>Birthday</InputGroup.Text>
                    <Form.Control type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                    </InputGroup>
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className='mb-4'>
                <InputGroup>
                    <InputGroup.Text>Email</InputGroup.Text>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </InputGroup>
            </Form.Group>

                <Form.Group controlId="formBasicPhone" className='mb-4'>
                    <InputGroup>
                        <InputGroup.Text>Cell Phone</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Enter phone number"
                            value={cellPhone}
                            onChange={(e) => setCellPhone(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group controlId="formBasicBusinessTitle" className='mb-4'>
                    <InputGroup>
                        <InputGroup.Text>Business Title</InputGroup.Text>
                        <Form.Control as="select" value={businessTitle} onChange={(e) => setBusinessTitle(e.target.value)}>
                            <option value="">Select a Business Title</option>
                            <option value="Employee">Employee</option>
                            <option value="Manager">Manager</option>
                            <option value="Stake Holder">Stake Holder</option>
                            <option value="Owner">Owner</option>
                        </Form.Control>
                    </InputGroup>
                </Form.Group>

                <Form.Group controlId="formBasicHireDate" className='mb-4'>
                    <InputGroup>
                        <InputGroup.Text>Hire Date</InputGroup.Text>
                        <Form.Control
                            type="date"
                            value={hireDate}
                            onChange={(e) => setHireDate(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group controlId="formBasicTerminationDate" className='mb-4'>
                    <InputGroup>
                        <InputGroup.Text>Termination Date</InputGroup.Text>
                        <Form.Control
                            type="date"
                            value={terminationDate}
                            onChange={(e) => setTerminationDate(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group controlId="formBasicPromotionDate" className='mb-4'>
                    <InputGroup>
                        <InputGroup.Text>Promotion Date</InputGroup.Text>
                        <Form.Control
                            type="date"
                            value={promotionDate}
                            onChange={(e) => setPromotionDate(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>

            <Form.Group controlId="formBasicIsActive" className='mb-4'>
            <InputGroup>
            <InputGroup.Text>Is Active</InputGroup.Text>
            <Form.Control
                as="select"
                value={isActive}
                onChange={(e) => setIsActive(e.target.value === "true")}
            >
                <option value="">--Select--</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </Form.Control>
            </InputGroup>
            </Form.Group>

        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} >
            Add Employee
        </Button>
    </Modal.Footer>
    </Modal>
    );
};

export default CreateEmployeeModal;
