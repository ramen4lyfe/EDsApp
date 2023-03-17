import './App.css';
import EmployeeList from './components/EmployeeList';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import UpdateEmployeeModal from './components/modals/UpdateEmployeeModal';
import NavigationBar from './components/navigation/NavigationBar';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/employees" element={<EmployeeList />} /> {/* Add the new route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
