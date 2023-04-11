import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const CreateAlphaCodeModal = ({ show, onHide, onSubmit }) => {
    const [alphaCode, setAlphaCode] = useState('');
    const [payRate, setPayRate] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/alphaCodes', {
                alphaCode,
                payRate,
            });

            if (response.status === 200) {
                alert('Alpha code created successfully');
            } else {
                alert('Failed to create alpha code');
            }
        } catch (error) {
            console.error('Error creating alpha code:', error);
            alert('Failed to create alpha code');
        }

        setAlphaCode('');
        setPayRate('');
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Create Alpha Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Alpha Code</Form.Label>
                        <Form.Control
                            type="text"
                            value={alphaCode}
                            onChange={(e) => setAlphaCode(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Pay Rate</Form.Label>
                        <Form.Control
                            type="number"
                            value={payRate}
                            onChange={(e) => setPayRate(e.target.value)}
                            required
                        />
                    </Form.Group>
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
