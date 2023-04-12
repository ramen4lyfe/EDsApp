import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, InputGroup } from 'react-bootstrap'
import axios from 'axios'

const UpdateAlphaCodeModal = ({ show, onHide, alphaCodeId }) => {
    const [alphaCode, setAlphaCode] = useState('')
    const [description, setDescription] = useState('')
    const [payRate, setPayRate] = useState('')
    const [overtimeRate, setOvertimeRate] = useState('')
    const [doubleTimeRate, setDoubleTimeRate] = useState('')
    const [trainingRate, setTrainingRate] = useState('')
    const [error, setError] = useState('')
    
    useEffect(() => {
        const fetchAlphaCode = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/alphaCodes/${alphaCodeId}`);
                const { alphaCode, description, payRate, overtimeRate, doubleTimeRate, trainingRate } = response.data;
                setAlphaCode(alphaCode);
                setDescription(description);
                setPayRate(payRate);
                setOvertimeRate(overtimeRate);
                setDoubleTimeRate(doubleTimeRate);
                setTrainingRate(trainingRate);
            } catch (error) {
                console.error('Error fetching alpha code:', error);
            }
        };
        fetchAlphaCode();
    }, [alphaCodeId]);

    const handleSubmit = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/api/alphaCodes/${alphaCodeId}`, {
                alphaCode,
                description,
                payRate,
                overtimeRate,
                doubleTimeRate,
                trainingRate,
            });

            // if (response.status === 200) {
            //     alert('Alpha code updated successfully');
            // } else {
            //     alert('Failed to update alpha code');
            // }
        } catch (error) {
            console.error('Error updating alpha code:', error);
            alert('Failed to update alpha code');
        }

        setAlphaCode('');
        setDescription('');
        setPayRate('');
        setOvertimeRate('');
        setDoubleTimeRate('');
        setTrainingRate('');
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Update Alpha Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <InputGroup className='mb-3'>
                        <InputGroup.Text>Alpha Code</InputGroup.Text>
                        <Form.Control
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
                            type="number"
                            value={overtimeRate}
                            onChange={(e) => setOvertimeRate(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup>
                        <InputGroup.Text>Double Time Rate</InputGroup.Text>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control
                            type="number"
                            value={doubleTimeRate}
                            onChange={(e) => setDoubleTimeRate(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup>
                        <InputGroup.Text>Training Rate</InputGroup.Text>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control
                            type="number"
                            value={trainingRate}
                            onChange={(e) => setTrainingRate(e.target.value)}
                        />
                    </InputGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UpdateAlphaCodeModal;

