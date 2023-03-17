import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
    axios.get("http://localhost:8000/api/employees")
        .then((response) => {
        setEmployees(response.data);
        })
        .catch(err => {
        console.log(err);
        });
    }, []);

    return (
    <EmployeeContext.Provider value={{ employees, setEmployees }}>
        {children}
    </EmployeeContext.Provider>
    );
};
