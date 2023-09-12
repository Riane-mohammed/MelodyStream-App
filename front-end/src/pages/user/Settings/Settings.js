import axios from 'axios';
import React, { useState } from 'react'
import './Settings.css'

const Settings = () => {
    const userid = localStorage.getItem("userId");
    const [order, setIsOrder] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        portfolioLink: '',
        bio: '',
    });
    axios.get(`http://localhost:8081/checkOrderStatus/${userid}`)
        .then(response => {
            setIsOrder(response.data.isOrdering);
        })
        .catch(error => {
            console.error('Error fetching follow status:', error);
        });
    
    const handleClick = () => {
        axios.post(`http://localhost:8081/Settings`, {
            userId: userid,
        })
            .then(response => {
            })
            .catch(error => {
                console.error('Error Order artist:', error);
            });
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (

        <div className='settings mb-5 mt-3'>
            <h2 className='m-4'>Artist Account Request</h2>
            <p className='mx-5'>Welcome to the Artist Account Request page! Are you a passionate creator looking to share your artistry with a broader audience? You're in the right place. With an Artist account, you'll unlock a world of opportunities to showcase your talent and connect with art enthusiasts.</p>
            <h3 className='m-4'>Why Become an Artist?</h3>
            <ul className='square-list'>
                <li>Exposure: Gain visibility among our community of art lovers.</li>
                <li>Exclusive Features: Access artist-specific tools and features.</li>
                <li>Monetize Your Art: Sell your creations and earn recognition.</li>
            </ul>
            <h3 className='m-4'>How to Request an Artist Account:</h3>
            <ol>
                <li>Ensure your profile reflects your artistic identity.</li>
                <li>Prepare a portfolio that showcases your work.</li>
                <li>Click the "Request Artist Account" button below.</li>
            </ol>

            <h3 className='m-4'>Request Form</h3>
            <form onSubmit={handleSubmit} className='d-flex flex-column'>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <label>
                    Username:
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <label>
                    Portfolio Link:
                    <input
                        type="text"
                        name="portfolioLink"
                        value={formData.portfolioLink}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Brief Bio:
                    <textarea name="bio" value={formData.bio} onChange={handleChange}></textarea>
                </label>
                    {!order ? (
                        <button className='btn btn-primary m- w-25 rounded' onClick={handleClick} > Transfer to Artist</button>
                    ) : (
                        <button className='btn btn-primary m-5 w-25 rounded'> Waiting For Reponse</button>
                    )}
            </form>

            <h3 className='m-4'>Request Confirmation:</h3>
            <p className='mx-5'>Once you submit your request, our team will review your application. We'll evaluate your portfolio, bio, and artistic style. If approved, you'll receive an email notification confirming your transition to an Artist account. You'll then gain access to the Artist Dashboard, where you can manage your art, interact with followers, and explore new creative horizons.</p>

            <p className='mx-5'>Join our thriving artist community today! Your journey to artistic success starts here.</p>
            
        </div>
    )
};

export default Settings