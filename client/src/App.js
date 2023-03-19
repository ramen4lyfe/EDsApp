import './App.css';
import EmployeeList from './components/EmployeeList';
import Bookings from './components/Bookings';
import ShiftSchedule from './components/ShiftSchedule';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import UpdateEmployeeModal from './components/modals/UpdateEmployeeModal';
import NavigationBar from './components/navigation/NavigationBar';
import { EmployeeProvider } from './components/context/EmployeeContext';

function App() {
  return (
    <BrowserRouter>
      <EmployeeProvider>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/shifts" element={<ShiftSchedule />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/update/:id" element={<UpdateEmployeeModal />} />
        </Routes>
      </EmployeeProvider>
    </BrowserRouter>
  );
}

export default App;
