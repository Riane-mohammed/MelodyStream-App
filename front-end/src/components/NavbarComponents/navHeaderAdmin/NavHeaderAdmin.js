import React,{useState,useEffect} from 'react'
import './NavHeaderAdmin.css'
import axios from 'axios';

function NavHeaderAdmin() {
    const userid = localStorage.getItem("userId");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userid) {
            axios.get(`http://localhost:8081/users/${userid}`)
                .then(response => {
                    setUser(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                    setLoading(false);
                });
        }
    }, [userid]);


    return (
        <header>
            <div className="image-text">
            <span className="imageAdmin">
                <img src={loading ? '../../assets/images/profiles/default.jpg' : `http://localhost:8081/uploads/images/profiles/${user.profileImage}`} alt="" />
            </span>

            <div className="text logo-text">
                <span className="name">melodystream</span>
                <span className="comment">Admin</span>
            </div>
            </div>
        </header>
    )
}

export default NavHeaderAdmin;