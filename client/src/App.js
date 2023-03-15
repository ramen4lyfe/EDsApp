import './App.css';
import EmployeeList from './components/EmployeeList'
import {Route, Routes, BrowserRouter} from "react-router-dom";
import UpdateEmployeeModal from './components/modals/UpdateEmployeeModal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<EmployeeList />}/>
        <Route path="/update/:id" element= {<UpdateEmployeeModal />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
