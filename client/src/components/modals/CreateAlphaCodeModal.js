import React, { useState } from 'react';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';

const CreateAlphaCodeModal = ({ show, onHide, onSubmit }) => {
    const [alphaCode, setAlphaCode] = useState([])
    const [description, setDescription] = useState([])
    const [payRate, setPayRate] = useState([])
    const [overtimeRate, setOvertimeRate] = useState([1.5])//overtime rate is 1.5 times pay rate
    const [doubleTimeRate, setDoubleTimeRate] = useState([2])//double time rate is 2 times pay rate
    // const [trainingRate, setTrainingRate] = useState([0.5])//training rate is base + 1

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/alphaCodes', {
                alphaCode,
                description,
                payRate,
                overtimeRate,
                doubleTimeRate,
                // trainingRate,

            });

            // if (response.status === 200) {
            //     alert('Alpha code created successfully');
            // } else {
            //     alert('Failed to create alpha code');
            // }
        } catch (error) {
            console.error('Error creating alpha code:', error);
            alert('Failed to create alpha code');
        }

        setAlphaCode('');
        setDescription('');
        setPayRate('');
        setOvertimeRate('');
        setDoubleTimeRate('');
        // setTrainingRate('');
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Create Alpha Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                        <InputGroup className='mb-3'>
                        <InputGroup.Text>Alpha Code</InputGroup.Text>
                        <Form.Control
                            // type="text"
                            value={alphaCode}
                            onChange={(e) => setAlphaCode(e.target.value)}
                            required
                        />
                        </InputGroup>

                        <InputGroup className='mb-3'>
                        <InputGroup.Text>Description</InputGroup.Text>
                        <Form.Control

                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        </InputGroup>

                        <InputGroup>
                        <InputGroup.Text>Pay Rate</InputGroup.Text>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control
                            type="number"
                            value={payRate}
                            onChange={(e) => setPayRate(e.target.value)}
                            required
                        />
                        </InputGroup>

                        <InputGroup>
                        <InputGroup.Text>Overtime Rate</InputGroup.Text>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control

                            value={overtimeRate}
                            onChange={(e) => setOvertimeRate(e.target.value)}
                            required
                        />
                        </InputGroup>

                        <InputGroup>
                        <InputGroup.Text>Double Time Rate</InputGroup.Text>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control

                            value={doubleTimeRate}
                            onChange={(e) => setDoubleTimeRate(e.target.value)}
                            required
                        />
                        </InputGroup>

                        {/* <InputGroup>
                        <InputGroup.Text>Training Rate</InputGroup.Text>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control
                            value={trainingRate}
                            onChange={(e) => setTrainingRate(e.target.value)}
                            required
                        />
                        </InputGroup> */}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateAlphaCodeModal;
