import React, {
    createContext,
    useState,
    useEffect
} from 'react';

const ShiftContext = createContext();
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().substr(0, 10));


const ShiftProvider = ({
    children
}) => {
    const [shifts, setShifts] = useState([]);

    useEffect(() => {
        const fetchShifts = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/shifts?date=${currentDate}'); // Replace with your actual API endpoint
                const data = await response.json();
                setShifts(data);
            } catch (error) {
                console.error('Error fetching shifts', error);
            }
        };

        fetchShifts();
    }, []);

    return ( <
        ShiftContext.Provider value = {
            {
                shifts
            }
        } > {
            children
        } <
        /ShiftContext.Provider>
    );
};

export {
    ShiftContext,
    ShiftProvider
};
