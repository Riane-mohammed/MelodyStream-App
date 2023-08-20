import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useStateProvider } from '../../../utils/StateProvider';

function ProfileModal(props) {
    const { state: { userid }, dispatch } = useStateProvider();
    const [image, setImage] = useState(null); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleSaveChanges = async () => {
        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            formData.append('username', username);
            if (image) {
                formData.append('profileImage', image);
            }

            const response = await axios.put(`http://localhost:8081/users/${userid}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);

            props.onHide();
        } catch (error) {
            console.error('Error updating user information:', error);
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modify Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Update Your Profile</h4>
                <div>
                    <label htmlFor="imageInput">Profile Image:</label>
                    <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <div>
                    <label htmlFor="usernameInput">Username:</label>
                    <input
                        type="text"
                        id="usernameInput"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    <label htmlFor="emailInput">Email:</label>
                    <input
                        type="email"
                        id="emailInput"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div>
                    <label htmlFor="passwordInput">Password:</label>
                    <input
                        type="password"
                        id="passwordInput"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ProfileModal;
