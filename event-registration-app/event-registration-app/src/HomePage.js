import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useToast } from './useToast';
import EventRegistrationApp from './EventRegistrationApp';

function HomePage() {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginFormData, setLoginFormData] = useState({userId: ''});
    const [userId, setUserId] = useState('');
    const { showError } = useToast();
    const { showMessage } = useToast();


    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginFormData({ ...loginFormData, [name]: value });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/users/login', loginFormData)
            .then(response => {
                showMessage('User logged in successfully');
                console.log('Login successful:', response.data);
                setIsLoggedIn(true);
                setUserId(response.data.userId);
            })
            .catch(error => {
                // Handle login error
                showError('Error logging in');
                console.error('Login error:', error);
            });
    };


    return (
        <div className="home-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10vh' }}>
           {isLoggedIn ? ( <EventRegistrationApp userId={userId}/> ) : (
           <div style={{ textAlign: 'center' }}>
             <h1>Sports Day</h1>
            <div className="login-section">
                <h2>Login</h2>
                <form onSubmit={handleLoginSubmit}>
                    <input type="text" name="userId" placeholder="User ID" value={loginFormData.userId} onChange={handleLoginChange} required />
                    <button style={{ marginLeft: '10px' }} type="submit">Login</button>
                </form>
            </div>
            
            <div className="register-section">
                <p>Don't have an account? <Link to="/user-registration">Register</Link></p>
                {/* Include the registration form here */}
                
            </div>
            
            </div>
    )};
</div>
    );
}
export default HomePage;
