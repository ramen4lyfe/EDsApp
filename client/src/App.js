import './App.css';
import EmployeeList from './components/EmployeeList';
import Bookings from './components/Bookings';
import ShiftSchedule from './components/ShiftSchedule';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import UpdateEmployeeModal from './components/modals/UpdateEmployeeModal';
import NavigationBar from './components/navigation/NavigationBar';
import { EmployeeProvider } from './components/context/EmployeeContext';
import Timesheets from './components/Timesheets';
import AlphaCodes from './components/AlphaCodes';

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
          <Route path="/payroll/timesheets" element={<Timesheets />} />
          <Route path="/update/:id" element={<UpdateEmployeeModal />} />
          <Route path="/payroll/alphacodes" element={<AlphaCodes />} />
        </Routes>
      </EmployeeProvider>
    </BrowserRouter>
  );
}

export default App;
