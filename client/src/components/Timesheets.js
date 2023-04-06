import React, { useState, useContext, useEffect } from "react";
import { Table, Form, Button, Container, Row, Col, ButtonGroup, InputGroup } from "react-bootstrap";
import Select from "react-select";
import moment from "moment";
import { EmployeeContext } from "./context/EmployeeContext";

const TimeSheet = () => {
    const { employees } = useContext(EmployeeContext);
    const employeeOptions = employees.map(employee => ({ value: employee._id, label: `${employee.firstName} ${employee.lastName}` }));
    const [employee, setEmployee] = useState("");
    const [businessTitle, setBusinessTitle] = useState("");
    const [timeSheet, setTimeSheet] = useState([]);
    const [monthYear, setMonthYear] = useState(moment().format("YYYY-MM"));
    const alphaCodeOptions = [
        { value: "A", label: "A. Host/GM (in training)" },
        { value: "B", label: "B. Host/GM I" },
        { value: "G", label: "G. Host/GM II" },
        { value: "H", label: "H. Host/GM III" },
        { value: "I", label: "I. Host/GM VI" },
        { value: "J", label: "J. Host/GM V" },
        { value: "C", label: "C. Manager" },
        { value: "D", label: "D. Overtime/Holiday" },
        { value: "E", label: "E. Double Time" },
        { value: "F", label: "F. Trainer" },
    ];

    const initTimeSheet = (selectedMonthYear) => {
        const selectedDate = moment(selectedMonthYear);
        const daysInMonth = selectedDate.daysInMonth();
        const initialTimeSheet = [];
        for (let i = 1; i <= daysInMonth; i++) {
            initialTimeSheet.push({
                day: moment(`${i}-${selectedDate.format("MM-YYYY")}`, "DD-MM-YYYY").format("ddd, DD-MM-YYYY"),
                timeIn: "",
                timeOut: "",
                totalHours: ""
            });
        }
        setTimeSheet(initialTimeSheet);
    };

    const handleEmployeeChange = (selectedOption) => {
        setEmployee(selectedOption);
    };

    const handleInputChange = (event, index) => {
        const { name, value } = event.target;
        const updatedTimeSheet = [...timeSheet];
        updatedTimeSheet[index][name] = value;
        setTimeSheet(updatedTimeSheet);
    };

    const calculateTotalHours = (index) => {
        const { timeIn, timeOut } = timeSheet[index];
        const timeInMinutes = timeIn ? getTimeInMinutes(timeIn) : 0;
        const timeOutMinutes = timeOut ? getTimeInMinutes(timeOut) : 0;
        const totalMinutes = timeOutMinutes - timeInMinutes;
        const totalHours = convertMinutesToHours(totalMinutes);
        const updatedTimeSheet = [...timeSheet];
        updatedTimeSheet[index].totalHours = totalHours;
        setTimeSheet(updatedTimeSheet);
    };

    const getTimeInMinutes = (timeString) => {
        const [hours, minutes] = timeString.split(":").map(Number);
        return hours * 60 + minutes;
    };

    const convertMinutesToHours = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(timeSheet);
    };

    const handleMonthYearChange = (event) => {
        const { value } = event.target;
        setMonthYear(value);
        initTimeSheet(value);
    };

    useEffect(() => {
        const initTimeSheet = (selectedMonthYear) => {
            const selectedDate = moment(selectedMonthYear);
            const daysInMonth = selectedDate.daysInMonth();
            const initialTimeSheet = [];
            for (let i = 1; i <= daysInMonth; i++) {
                initialTimeSheet.push({
                    day: moment(`${i}-${selectedDate.format("MM-YYYY")}`, "DD-MM-YYYY").format("ddd, DD-MM-YYYY"),
                    timeIn: "",
                    timeOut: "",
                    totalHours: ""
                });
            }
            setTimeSheet(initialTimeSheet);
        };

        if (employees.length > 0) {
            if (employee.value) {
                const selectedEmployee = employees.find(emp => emp._id === employee.value);
                setBusinessTitle(selectedEmployee.businessTitle);
            }
            initTimeSheet(monthYear);
        }
    }, [employee, employees, monthYear]);



    return (
        <Container>
            <Row className="mb-4 align-items-center">
                <Col>
                    <h3>Timesheet</h3>
                </Col>
                <Col>
                    <Form.Group>
                        <InputGroup hasValidation>
                            <InputGroup.Text> Month <i className="fas fa-calendar-alt"></i></InputGroup.Text>
                            <Form.Control type="month" value={monthYear} onChange={handleMonthYearChange} required />
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col>
                    <Select
                        options={employeeOptions}
                        value={employee}
                        onChange={handleEmployeeChange}
                        placeholder="Select Employee..."
                    />
                </Col>
            </Row>
            <Table striped bordered hover size='sm' className="fixed-height-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time In</th>
                        <th>Time Out</th>
                        <th>Alpha Code</th>
                        <th>Total Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {timeSheet.map((day, index) => (
                        <tr key={index}>
                            <td>{day.day}</td>
                            <td>
                                <Form.Control type="time" name="timeIn" value={day.timeIn} onChange={(event) => handleInputChange(event, index)} onBlur={() => calculateTotalHours(index)} />
                            </td>
                            <td>
                                <Form.Control type="time" name="timeOut" value={day.timeOut} onChange={(event) => handleInputChange(event, index)} onBlur={() => calculateTotalHours(index)} />
                            </td>
                            <td className="alpha-code-cell">
                                <Select
                                    options={alphaCodeOptions}
                                    value={day.alphaCode}
                                    onChange={(selectedOption) => {
                                        const updatedTimeSheet = [...timeSheet];
                                        updatedTimeSheet[index].alphaCode = selectedOption;
                                        setTimeSheet(updatedTimeSheet);
                                    }}
                                    className="w-100"
                                />
                            </td>
                            <td>{day.totalHours}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Row>
                <Col md={{ span: 5, offset: 7 }}>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>Alpha Code</th>
                                <th>Hours</th>
                                <th>Pay Rate</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>A</td>
                                <td>40</td>
                                <td>payrate place holder</td>
                                <td>$ 60</td>
                            </tr>

                        </tbody>

                    </Table>
                    <Table >
                        <tbody>
                            <tr>
                                <th>Total Earning</th>
                                <td>60</td>
                            </tr>
                        </tbody>
                    </Table>

                </Col>
            </Row>

            <ButtonGroup className="d-flex justify-content-end">
                <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
            </ButtonGroup>
        </Container>
    );
};

export default TimeSheet;