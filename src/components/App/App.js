import logo from '../../resources/logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskView from '../Tasks/TaskView';
import UserInformation from '../User/UserInformation';
import Header from '../Common/Header';
import Login from '../Auth/Login';
import Registration from '../Auth/Register';
import Home from '../Home/Home';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<TaskView />} />
        <Route path="/profile" element={<UserInformation />} />
        <Route path='/register' element={<Registration/>}/>
      </Routes>
    </Router>
  );
}

export default App;