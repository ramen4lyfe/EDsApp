import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function CreateEmployeeModal ({ show, handleClose }) {
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

    const handleSubmit = (e) => {
    e.preventDefault();
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
        isActive })
        .then((response) => {
            console.log(email)
            console.log(response);
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
            <Form.Group controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            {/* {errors.firstName ? <p className="text-danger">{errors.firstName.message}</p> : null} */}

            </Form.Group>
            
            <Form.Group controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            {/* {errors.lastName ? <p className="text-danger">{errors.lastName.message}</p> : null} */}

            </Form.Group>

            <Form.Group controlId="formBasicPreferredName">
            <Form.Label>Preferred Name</Form.Label>
            <Form.Control
                type="text"
                placeholder="Preferred Name"
                value={preferredName}
                onChange={(e) => setPreferredName(e.target.value)}
            />
            {errors.prefferedName ? <p className="text-danger">{errors.prefferedName.message}</p> : null}

            </Form.Group>

            <Form.Group controlId="formBasicGender">
            <Form.Label>Gender</Form.Label>
            <Form.Select value={genderName} onChange={(e) => setGenderName(e.target.value)}>
                <option value="">Select gender</option>
                <option value="He/Him">He/Him</option>
                <option value="She/Her">She/Her</option>
                <option value="They/Them">They/Them</option>
            </Form.Select>
            {/* {errors.genderName ? <p className="text-danger">{errors.genderName.message}</p> : null} */}

            </Form.Group>

            <Form.Group controlId="formBasicBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
            />
            {/* {errors.birthday ? <p className="text-danger">{errors.birthday.message}</p> : null} */}
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </Form.Group>

            <Form.Group controlId="formBasicPhone">
            <Form.Label>Cell Phone</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={cellPhone}
                onChange={(e) => setCellPhone(e.target.value)}
            />
            {/* {errors.cellPhone ? <p className="text-danger">{errors.cellPhone.message}</p> : null} */}
            </Form.Group>
            
            <Form.Group controlId="formBasicBusinessTitle">
            <Form.Label>Business Title</Form.Label>
            <Form.Control as="select" value={businessTitle} onChange={(e) => setBusinessTitle(e.target.value)}>
                <option value="">Select a Business Title</option>
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Stake Holder">Stake Holder</option>
                <option value="Owner">Owner</option>
            </Form.Control>
            {/* {errors.businessTitle ? <p className="text-danger">{errors.businessTitle.message}</p> : null} */}
            </Form.Group>

            
            
            
            <Form.Group controlId="formBasicHireDate">
            <Form.Label>Hire Date</Form.Label>
            <Form.Control
                type="date"
                value={hireDate}
                onChange={(e) => setHireDate(e.target.value)}
            />
            {/* {errors.hireDate ? <p className="text-danger">{errors.hireDate.message}</p> : null} */}

            </Form.Group>
            
            <Form.Group controlId="formBasicTerminationDate">
            <Form.Label>Termination Date</Form.Label>
            <Form.Control
                type="date"
                value={terminationDate}
                onChange={(e) => setTerminationDate(e.target.value)}
            />
            </Form.Group>
            
            <Form.Group controlId="formBasicPromotionDate">
            <Form.Label>Promotion Date</Form.Label>
            <Form.Control
                type="date"
                value={promotionDate}
                onChange={(e) => setPromotionDate(e.target.value)}
            />
            </Form.Group>

            <Form.Group controlId="formBasicIsActive">
            <Form.Label>Is Active</Form.Label>
            <Form.Control as="select" value={isActive} onChange={(e) => setIsActive(e.target.value)}>
                <option value="">--Select--</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
            </Form.Control>
            {errors.isActive ? <p className="text-danger">{errors.isActive.message}</p> : null}
            </Form.Group>

        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Cancel
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
            Add Employee
        </Button>
    </Modal.Footer>
    </Modal>
    );
};

export default CreateEmployeeModal;
