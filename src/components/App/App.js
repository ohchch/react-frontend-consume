import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserInformation from '../User/UserInformation';
import Header from '../Common/Header';
import Login from '../Auth/Login';
import Registration from '../Auth/Register';
import Home from '../Home/Home';
import OAuthCallback from '../Auth/OAuthCallback';
import AboutUs from '../InfoPages/AboutUs';
import TermsAndConditions from '../InfoPages/TermsAndConditions';
import ContactUs from '../InfoPages/ContactUs';
import UserInfoPage from '../Auth/UserInfoPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserInformation />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/user-info" element={<UserInfoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
