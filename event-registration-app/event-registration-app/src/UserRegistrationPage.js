import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from './useToast';
import HomePage from './HomePage';

function UserRegistrationPage() {
    const [isRegistered, setIsRegistered] = useState(false);
    const [registerFormData, setRegisterFormData] = useState({userId: ''});
    const { showError } = useToast();
    const { showMessage } = useToast();

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterFormData({ ...registerFormData, [name]: value });
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/users', registerFormData)
            .then(response => {
                showMessage('User Registered successfully');
                console.log('Registration successful:', response.data);
                setIsRegistered(true);
                
            })
            .catch(error => {
                // Handle login error
                showError('Error occured during Registration');
                console.error('Registration error:', error);
            });
    };


    return (
        <div className="register-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10vh' }}>
           {isRegistered ? <HomePage /> : (
           <div style={{ textAlign: 'center' }}>
             <h1>Sports Day</h1>
            <div className="register-section">
                <h2>Create your Account</h2>
                <form onSubmit={handleRegisterSubmit}>
                    <input type="text" name="userId" placeholder="User ID" value={registerFormData.userId} onChange={handleRegisterChange} required />
                    <button style={{ marginLeft: '10px' }} type="submit">Register</button>
                </form>
            </div>
            </div>
    )};
</div>
    );
}
export default UserRegistrationPage;
