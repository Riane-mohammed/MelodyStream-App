import React,{useState,useEffect} from 'react'
import './topbarDash.css'
import axios from 'axios';

function TopbarDash() {
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
        <div className="topbar">
            <div className="toggle">
                <i className='bx bx-menu'></i>
            </div>

            <div className="search">
                <label className="search-label">
                    <input type="text" placeholder="Search here" />
                    <i className='bx bx-search'></i>
                </label>
            </div>


            <div className="user">
                <img src={loading ? '../../assets/images/profiles/default.jpg' : `http://localhost:8081/uploads/images/profiles/${user.profileImage}`} alt="" />
            </div>
        </div>
    )
}

export default TopbarDash