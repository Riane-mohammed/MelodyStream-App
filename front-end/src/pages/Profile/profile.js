import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import ProfileHeader from '../../components/ProfileComponenets/profileHeader/profileHeader';
import ProfileModal from '../../components/ProfileComponenets/profileBtn/profileBtn';
import { useStateProvider } from '../../utils/StateProvider';

const ProfileSection = () => {
    const userid = localStorage.getItem("userId");
    const { dispatch } = useStateProvider();
    const [modalShow, setModalShow] = useState(false);
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        if (userid) {
            axios.get(`http://localhost:8081/users/${userid}`)
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                });
        }
    }, [userid]);

    console.log(userid)

    return (
        <div>
            {user && (
                <>
                    <ProfileHeader
                        image={user.profileImage ? `http://localhost:8081/uploads/images/profiles/${user.profileImage}` : '../../assets/images/profiles/default.jpg'}
                        icon={user.Role ? 'bxs-badge-check' : ''}
                        name={user.username}
                        type={user.Role ? 'Artist' : 'Profile'}
                        subtitle={user.Role ? `10000 monthly listeners` : user.email}
                    />
                    <div className='my-5 prfl-btn'>
                        <Button
                            variant="primary"
                            className='rounded-circle mx-5'
                            style={{
                                backgroundColor: 'var(--primary-color)',
                                border: 'none',
                            }}
                            onClick={() => setModalShow(true)}
                        >
                            <i className='bx bx-dots-vertical-rounded fs-2 text-white'></i>
                        </Button>
                        <ProfileModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfileSection;
