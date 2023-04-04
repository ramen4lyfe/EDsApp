import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';


const UpdateEmployeeModal = ({ show, handleClose, employee, id , onEmployeeUpdated}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [preferredName, setPreferredName] = useState('');
    const [genderName, setGenderName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [cellPhone, setCellPhone] = useState('');
    const [businessTitle, setBusinessTitle] = useState('');
    const [payRate, setPayRate] = useState('');
    const [hireDate, setHireDate] = useState('');
    const [terminationDate, setTerminationDate] = useState('');
    const [promotionDate, setPromotionDate] = useState('');
    const [isActive, setIsActive] = useState(null);
    const [allottedHours, setAllottedHours] = useState('');

    // const [errors, setErrors] = useState('');

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8000/api/employees/${id}`)
                .then((response) => {
                    console.log(response);
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setPreferredName(response.data.preferredName);
                    setGenderName(response.data.genderName);
                    setBirthday(response.data.birthday);
                    setEmail(response.data.email);
                    setCellPhone(response.data.cellPhone);
                    setBusinessTitle(response.data.businessTitle);
                    setPayRate(response.data.payRate);
                    setHireDate(response.data.hireDate);
                    setTerminationDate(response.data.terminationDate);
                    setPromotionDate(response.data.promotionDate);
                    setIsActive(response.data.isActive);
                    setAllottedHours(response.data.allottedHours);
                })
                .catch((err) => {
                    console.log(err.response.data.error.errors);
                });
        }
    }, [id, employee]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/employees/update/${id}`, {
            firstName,
            lastName,
            preferredName,
            genderName,
            birthday,
            email,
            cellPhone,
            businessTitle,
            payRate,
            hireDate,
            terminationDate,
            promotionDate,
            isActive,
            allottedHours,
        })
            .then((response) => {
                console.log(response);
                handleClose();
                onEmployeeUpdated();
            })
            .catch((err) => {
                if (err.response) {
                    // Request made and server responded
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                } else if (err.request) {
                    // The request was made but no response was received
                    console.log(err.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', err.message);
                }
                console.log(err.config);
            });
    };

    return (
        <Modal show={show} onHide={handleClose} size="md">
            <Modal.Header closeButton>
                <Modal.Title>Editing {firstName}'s Record</Modal.Title>
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
                            <Form.Control type="text" value={preferredName} onChange={(e) => setPreferredName(e.target.value)} />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formBasicGender" className='mb-4'>
                        <InputGroup>
                            <InputGroup.Text>Gender Name</InputGroup.Text>
                            <Form.Select value={genderName} onChange={(e) => setGenderName(e.target.value)}>
                                <option value="">--Select--</option>
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
                            <InputGroup.Text>Personal Email</InputGroup.Text>
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

                    <Form.Group controlId="formBasicPayRate" className='mb-4'>
                        <InputGroup hasValidation>
                            <InputGroup.Text>Pay Rate</InputGroup.Text>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control
                                type="number"
                                placeholder="Enter pay rate"
                                value={payRate}
                                onChange={(e) => setPayRate(e.target.value)}
                                required
                                // isInvalid={errors.payRate}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter Pay Rate.
                            </Form.Control.Feedback>
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

                    <Form.Group controlId="formBasicAllottedHours" className='mb-4'>
                        <InputGroup>
                            <InputGroup.Text>Allotted Hours/ Week</InputGroup.Text>
                            <Form.Control
                                type="number"
                                value={allottedHours}
                                onChange={(e) => setAllottedHours(e.target.value)}
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
            <Modal.Footer className='d-flex justify-content-center'>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Update Info
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateEmployeeModal