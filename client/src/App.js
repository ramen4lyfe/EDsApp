import './App.css';
import EmployeeList from './components/EmployeeList'
import {Route, Routes, BrowserRouter} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<EmployeeList />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
