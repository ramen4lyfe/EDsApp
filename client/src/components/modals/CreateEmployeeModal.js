import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function EmployeeModal ({ show, handleClose }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [prefferedName, setPreferredName] = useState('');
    const [genderName, setGenderName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [personalEmail, setPersonalEmail] = useState('');
    const [cellPhone, setCellPhone] = useState('');
    const [businessTitle, setBusinessTitle] = useState('');
    const [workEmail, setWorkEmail] = useState('');
    const [hireDate, setHireDate] = useState('');
    const [terminationDate, setTerminationDate] = useState('');
    const [promotionDate, setPromotionDate] = useState('');
    const [isActive, setIsActive] = useState('');

    const [errors, setErrors] = useState('');

    const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/employees", { firstName, lastName, prefferedName, genderName, birthday, personalEmail, cellPhone, businessTitle, workEmail, hireDate, terminationDate, promotionDate, isActive })
        .then((response) => {
            console.log(response);
            setFirstName("");
            setLastName("");
            setPreferredName("");
            setGenderName("");
            setBirthday("");
            setPersonalEmail("");
            setCellPhone("");
            setBusinessTitle("");
            setWorkEmail("");
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
    <Modal show={show} onHide={handleClose}>
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
            </Form.Group>
            
            <Form.Group controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            </Form.Group>

            <Form.Group controlId="formBasicPreferredName">
            <Form.Label>Preferred Name</Form.Label>
            <Form.Control
                type="text"
                placeholder="Preferred Name"
                value={prefferedName}
                onChange={(e) => setPreferredName(e.target.value)}
            />
            </Form.Group>

            <Form.Group controlId="formBasicGenderName">
            <Form.Label>Gender Name</Form.Label>
            <Form.Control
                type="text"
                placeholder="Gender Name"
                value={genderName}
                onChange={(e) => setGenderName(e.target.value)}
            />
            </Form.Group>

            <Form.Group controlId="formBasicBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
            />
            </Form.Group>

            <Form.Group controlId="formBasicPersonalEmail">
            <Form.Label>Personal Email</Form.Label>
            <Form.Control
                type="email"
                value={personalEmail}
                onChange={(e) => setPersonalEmail(e.target.value)}
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
            </Form.Group>
            
            <Form.Group controlId="formBasicBusinessTitle">
            <Form.Label>Business Title</Form.Label>
            <Form.Control
                type="text"
                placeholder="Employees or Manager"
                value={businessTitle}
                onChange={(e) => setBusinessTitle(e.target.value)}
            />
            </Form.Group>
            
            <Form.Group controlId="formBasicWorkEmail">
            <Form.Label>Work Email</Form.Label>
            <Form.Control
                type="email"
                placeholder="Enter EDs email"
                value={workEmail}
                onChange={(e) => setWorkEmail(e.target.value)}
            />
            </Form.Group>
            
            <Form.Group controlId="formBasicHireDate">
            <Form.Label>Hire Date</Form.Label>
            <Form.Control
                type="date"
                value={hireDate}
                onChange={(e) => setHireDate(e.target.value)}
            />
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
            <Form.Label>Is Active?</Form.Label>
            <div key={`inline-radio`} className="mb-3">
            <Form.Check
                inline
                label="Yes"
                name="isActiveRadios"
                type="radio"
                id={`inline-radio-1`}
                value="true"
                checked={isActive === "true"}
                onChange={(e) => setIsActive(e.target.value)}
            />
            <Form.Check
                inline
                label="No"
                name="isActiveRadios"
                type="radio"
                id={`inline-radio-2`}
                value="false"
                checked={isActive === "false"}
                onChange={(e) => setIsActive(e.target.value)}
            />
            </div>
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

export default EmployeeModal;
