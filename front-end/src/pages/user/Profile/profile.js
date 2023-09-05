import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileHeader from '../../../components/ProfileComponenets/profileHeader/profileHeader';
import ProfileModal from '../../../components/ProfileComponenets/profileBtn/profileBtn';
import { useStateProvider } from '../../../utils/StateProvider';
import './profile.css'

const ProfileSection = () => {
    const userid = localStorage.getItem("userId");
    const { dispatch } = useStateProvider();
    const [modalShow, setModalShow] = useState(false);
    const [user, setUser] = useState(null);
    const [viewsCount, setViewsCount] = useState(0);
    const [followersCount, setFollowersCount] = useState(0);
    
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
    

    useEffect(() => {
        axios.get(`http://localhost:8081/ViewsNumber/${userid}`)
            .then(response => {
                setViewsCount(response.data[0]['views']);
            })
            .catch(error => {
                console.error('Error fetching view Number count:', error);
            });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8081/FollowersNumber/${userid}`)
            .then(response => {
                setFollowersCount(response.data[0]['COUNT(*)']);
            })
            .catch(error => {
                console.error('Error fetching followers Number count:', error);
            });
    }, []);


    return (
        <div className='profile-sec'>
            {user && (
                <>
                    <ProfileHeader
                        image={user.profileImage ? `http://localhost:8081/uploads/images/profiles/${user.profileImage}` : '../../assets/images/profiles/default.jpg'}
                        icon={user.Role === 3 ? 'bxs-badge-check' : ''}
                        name={user.username}
                        type={user.Role === 3 ? 'Artist' : 'Profile'}
                        subtitle={user.Role === 3  ? `${followersCount} Followers | ${viewsCount} listeners` : user.email}
                    />
                    <div className='my-5 d-flex align-items-center prfl-btn'>
                        <button
                            variant="primary"
                            className='rounded-circle mx-5'
                            style={{
                                backgroundColor: 'var(--primary-color)',
                                border: 'none',
                                width: '60px',
                                height: '60px',
                            }}
                            onClick={() => setModalShow(true)}
                        >
                            <i className='bx bx-dots-vertical-rounded fs-2 text-white'></i>
                        </button>
                        <ProfileModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            image={user.profileImage ? `http://localhost:8081/uploads/images/profiles/${user.profileImage}` : '../../assets/images/profiles/default.jpg'}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfileSection;
