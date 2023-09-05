import React, { useEffect, useState } from 'react';
import './users.css';
import axios from 'axios';
import EditModal from '../../../components/editModal/EditModal';

const Users = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const [editModalShow, setEditModalShow] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const openEditModal = (user) => {
        setSelectedUserId(user.id);
        setEditModalShow(true);
    };

    const closeEditModal = () => {
        setSelectedUserId(null);
        setEditModalShow(false);
    };

    useEffect(() => {
        axios.get('http://localhost:8081/Allusers')
            .then(response => {
                setUsers(response.data);
                setDisplayedUsers(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setLoading(false);
            });
    }, []);

    const deleteUser = (userId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');

        if (confirmDelete) {
            axios.delete(`http://localhost:8081/delete-user/${userId}`)
                .then(() => {
                    setUsers(users.filter(user => user.id !== userId));
                })
                .catch(error => {
                    console.error('Error deleting user:', error);
                });
        }
    };
    console.log(users)
    const AllUsers = loading ? [] : users;

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
        const filteredUsers = users.filter(
            user => user.username.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setDisplayedUsers(filteredUsers);
    };

    return (
        <div className="users my-5">
            <div className="cardHeader">
                <h2>Users</h2>
            </div>
            <div className='ms-3 ms-sm-5'>
                <li className="search-box">
                    <i className="bx bx-search icon"></i>
                    <input
                        type="text"
                        placeholder="Search ..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </li>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>Profile</td>
                        <td className='text-start'>Name</td>
                        <td className='text-center'>Role</td>
                        <td className='text-center'>Email</td>
                        <td className='text-center'>Password</td>
                        <td className='text-center'>Created</td>
                        <td className='text-center'>Actions</td>
                    </tr>
                </thead>

                <tbody>
                    {
                            displayedUsers.map((user) =>
                                <tr key={user.id}>
                                    <td><img src={`http://localhost:8081/uploads/images/profiles/${user.profileImage}`} alt={user.username} /></td>
                                    <td className='text-start'>{user.username}</td>
                                    <td className='text-center'>{user.Role === 1 ? 'Admin' : user.Role === 2 ? 'User' : 'Artist'}</td>
                                    <td className='text-center'>{user.email}</td>
                                    <td className='text-center'>{user.password}</td>
                                    <td className='text-center'>25 juillet</td>
                                    <td className='d-flex justify-content-center'>
                                        <button className='btn btn-info me-3' onClick={() => openEditModal(user)}>
                                            <i className='bx bx-edit-alt text-white'></i>
                                        </button>
                                        <button className='btn btn-danger' onClick={() => deleteUser(user.id)}>
                                            <i className='bx bx-trash text-white'></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                </tbody>
            </table>
            <EditModal
                show={editModalShow}
                onHide={() => setEditModalShow(false)}
                selectedUserId={selectedUserId} 
            />
        </div>
    );
}

export default Users;
