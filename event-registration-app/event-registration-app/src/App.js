import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventRegistrationApp from './EventRegistrationApp';
import UserRegistrationPage from './UserRegistrationPage';
import MyEventsPage from './MyEventsPage';
import HomePage from './HomePage';


function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        {/* <li>
          <Link to="/event-registration" className="nav-link">Event Registration</Link>
        </li> */}
        <li>
          <Link to="/user-registration" className="nav-link">User Registration</Link>
        </li>
        {/* <li>
          <Link to="/my-events" className="nav-link">My Events</Link>
        </li> */}
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
      <ToastContainer />
      <Navbar />
        
        <Routes>
          <Route path="/event-registration" element={<EventRegistrationApp  />} />
          <Route path="/user-registration" element={<UserRegistrationPage />} />
          <Route path="/my-events" element={<MyEventsPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
