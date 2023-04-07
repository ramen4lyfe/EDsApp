// a vertical nav bar with react-icons link to the payroll pages
import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaClock, FaCode, FaDollarSign } from 'react-icons/fa';

const PayrollNav = () => {
  return (
    <Nav className="flex-column">
      <Nav.Link href="/timesheet">
        <FaClock /> Timesheet
      </Nav.Link>
      <Nav.Link href="/alpha-codes">
        <FaCode /> Alpha Codes
      </Nav.Link>
      <Nav.Link href="/pay-rate">
        <FaDollarSign /> Pay Rate
      </Nav.Link>
    </Nav>
  );
};

export default PayrollNav;


