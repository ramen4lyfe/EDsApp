import React from 'react'
import PayrollNav from './navigation/payrollNav'
import { Table, Form, Button, Container, Row, Col, ButtonGroup, InputGroup } from "react-bootstrap";



const AlphaCodes = () => {


    return (
        <Container fluid>
            <Row>
                <Col md={1.5} className="vertical-navbar">
                    <PayrollNav />
                </Col>
                <Col md={10} className="p-3">
                    <h3>Alpha Codes</h3>
                    {/* <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridAlphaCode">
                                <Form.Label>Alpha Code</Form.Label>
                                <Form.Control type="text" placeholder="Enter Alpha Code" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter Description" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridRate">
                                <Form.Label>Rate</Form.Label>
                                <Form.Control type="text" placeholder="Enter Rate" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridRateType">
                                <Form.Label>Rate Type</Form.Label>
                                <Form.Control as="select" defaultValue="Choose...">
                                    <option>Choose...</option>
                                    <option>Hourly</option>
                                    <option>Salary</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridNotes">
                                <Form.Label>Notes</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                        </Form.Row>

                        <ButtonGroup aria-label="Basic example">
                            <Button variant="primary">Save</Button>
                            <Button variant="secondary">Cancel</Button>
                        </ButtonGroup>
                    </Form> */}
                </Col>
            </Row>
        </Container>
    )
}

export default AlphaCodes