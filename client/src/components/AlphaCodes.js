import React, { useEffect, useState } from 'react'
import PayrollNav from './navigation/payrollNav'
import { Table, Form, Button, Container, Row, Col, ButtonGroup, InputGroup } from "react-bootstrap";
import axios from 'axios'
import CreateAlphaCodeModal from './modals/CreateAlphaCodeModal';
import { BiPencil, BiTrash } from 'react-icons/bi';
import UpdateAlphaCodeModal from './modals/UpdateAlphaCodeModal';




const AlphaCodes = () => {
    const [alphaCode, setAlphaCode] = useState([])
    const [description, setDescription] = useState([])
    const [payRate, setPayRate] = useState([])
    const [show, setShow] = useState(false);
    const [overtimeRate, setOvertimeRate] = useState([1.5])//overtime rate is 1.5 times pay rate
    const [doubleTimeRate, setDoubleTimeRate] = useState([2])//double time rate is 2 times pay rate
    // const [trainingRate, setTrainingRate] = useState([0.5])//training rate is base + 1
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [alphaCodeId, setAlphaCodeId] = useState('');



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

    const handleDeleteAlphaCode = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/alphaCodes/delete/${id}`)
            setAlphaCode(alphaCode.filter((alphaCode) => alphaCode._id !== id))
        } catch (err) {
            console.log(err)
        }
    }

    const handleShowUpdateModal = (alphaCode) => {
        setShowUpdateModal(true);
        setAlphaCode(alphaCode);
    }

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setAlphaCode({});
    }

    const handleUpdateAlphaCode = async (alphaCode) => {
        try {
            await axios.put(`http://localhost:8000/api/alphaCodes/update/${alphaCode._id}`, alphaCode)
            this.handleCloseUpdateModal();
        } catch (err) {
            console.log(err)
        }
    }




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
                                <CreateAlphaCodeModal show={show} onHide={() => setShow(false)} />
                            </ButtonGroup>

                        </Col>
                    </Row>
                    <Table bordered hover size='sm' className="mt-4" >
                        <thead>
                            <tr>
                                <th> </th>
                                <th>Alpha Code</th>
                                <th>Description</th>
                                <th>Pay Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alphaCode.map((alphaCode, index) => (
                                <tr key={index}>
                                    <td>
                                        <ButtonGroup className=" d-flex justify-content-center">
                                            <Button 
                                                variant="light" 
                                                size="sm"
                                                onClick={() => setShow(true)}>
                                                <BiPencil />
                                                <UpdateAlphaCodeModal show={show} onHide={() => setShow(false)} />
                                            </Button>
                                            <Button 
                                                variant="light" 
                                                size="sm" 
                                                onClick={() => handleDeleteAlphaCode(alphaCode._id)}>
                                                <BiTrash />
                                            </Button>
                                        </ButtonGroup>
                                    </td>
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