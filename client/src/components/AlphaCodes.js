import React, { useEffect, useState } from 'react'
import PayrollNav from './navigation/payrollNav'
import { Table, Form, Button, Container, Row, Col, ButtonGroup, InputGroup } from "react-bootstrap";
import axios from 'axios'
import CreateAlphaCodeModal from './modals/CreateAlphaCodeModal';



const AlphaCodes = () => {
    const [alphaCode, setAlphaCode] = useState([])
    const [description, setDescription] = useState([])
    const [payRate, setPayRate] = useState([])
    const [show, setShow] = useState(false);
    const [overtimeRate, setOvertimeRate] = useState([1.5])//overtime rate is 1.5 times pay rate
    const [doubleTimeRate, setDoubleTimeRate] = useState([2])//double time rate is 2 times pay rate
    // const [trainingRate, setTrainingRate] = useState([0.5])//training rate is base + 1

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/alphaCodes')
            .then(res => {
                setAlphaCode(res.data)
            }
            )
            .catch(err => console.log(err))
    }, [show,])



    return (
        <Container fluid>
            <Row>
                <Col md={1.5} className="vertical-navbar">
                    <PayrollNav />
                </Col>
                <Col md={10} className="p-3">
                    <Row className='d-flex align-items-center'> 
                        <Col>
                            <h3> Alpha Codes</h3>
                        </Col>
                        <Col>
                            <ButtonGroup className="float-right">
                                <Button variant="primary" onClick={handleShow}>Create Alpha Code</Button>
                                <CreateAlphaCodeModal show={show} onHide={handleClose} />
                            </ButtonGroup>

                        </Col>
                    </Row>
                    <Table bordered hover size='sm' className="mt-4" >
                        <thead>
                            <tr>
                                <th>Alpha Code</th>
                                <th>Description</th>
                                <th>Pay Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alphaCode.map((alphaCode, index) => (
                                <tr key={index}>
                                    <td>{alphaCode.alphaCode}</td>
                                    <td>{alphaCode.description}</td>
                                    <td>{alphaCode.payRate}</td>
                                </tr>
                            ))}
                        </tbody>

                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default AlphaCodes