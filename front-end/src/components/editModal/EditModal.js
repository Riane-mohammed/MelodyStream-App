import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function EditModal(props) {
    const [image, setImage] = useState(null); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');

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

    const handleRoleChange = (event) => {
        setRole(event.target.value);
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

            const response = await axios.put(`http://localhost:8081/users/${props.selectedUserId}`, formData, {
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
                    Update Your Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='grid grid-cols-12 gap-4 gap-y-3'>
                    <div className='image mx-auto'>
                        {/* <img src={`http://localhost:8081/uploads/images/profiles/${props.selectedUserId.profileImage}`} style={{ width: '180px', height:'180px' }} /> */}
                        <input
                            type="file"
                            id="imageInput"
                            accept="image/*"
                            onChange={handleImageChange}
                            className='mt-3 mb-5'
                        />
                    </div>
                    <div className="col-span-12 sm:col-span-12 ">
                        <label htmlFor="usernameInput" className="form-label">Username</label>
                        <input
                            id="usernameInput"
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleUsernameChange}
                            className="form-control mb-3 "
                            placeholder="Username"
                            required />
                    </div>
                    <div className="col-span-12 sm:col-span-12">
                        <label htmlFor="roleInput" className="form-label">Role</label>
                        <select
                            id="roleInput"
                            name="role"
                            value={role}
                            onChange={handleRoleChange}
                            className="form-select mb-3"
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="1">Admin</option>
                            <option value="2">User</option>
                            <option value="3">Artist</option>
                        </select>
                    </div>
                    <div className="col-span-12 sm:col-span-12">
                        <label htmlFor="emailInput" className="form-label">Email</label>
                        <input
                            id="emailInput"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="form-control mb-3"
                            placeholder="Email"
                            required />
                    </div>
                    <div className="col-span-12 sm:col-span-12">
                        <label htmlFor="passwordInput" className="form-label">Password</label>
                        <input
                            id="passwordInput"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="form-control mb-3"
                            placeholder="Password"
                            required />
                    </div>
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

export default EditModal;
