import React, {useEffect,useState} from 'react'
import './Dashboard.css'
import CardDash from '../../../components/cardDash/cardDash';
import axios from 'axios';

const Dashboard = () => {
    const [userCount, setUserCount] = useState(0);
    const [artistCount, setArtistCount] = useState(0);
    const [songCount, setSongCount] = useState(0);
    const [playlistCount, setPlaylistCount] = useState(0);
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState();
    const [LoadingOrders, setLoadingOrders] = useState(true);
    
    useEffect(() => {
        axios.get('http://localhost:8081/orders')
            .then(response => {
                setOrders(response.data);
                setLoadingOrders(false);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setLoadingOrders(false);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8081/users')
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8081/usersNumber')
            .then(response => {
                setUserCount(response.data[0]['COUNT(*)']);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user count:', error);
                setLoading(false);
            });
    }, []);
    
    useEffect(() => {
        axios.get('http://localhost:8081/ArtistsNumber')
            .then(response => {
                setArtistCount(response.data[0]['COUNT(*)']);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user count:', error);
                setLoading(false);
            });
    }, []);
    
    useEffect(() => {
        axios.get('http://localhost:8081/SongsNumber')
            .then(response => {
                setSongCount(response.data[0]['COUNT(*)']);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user count:', error);
                setLoading(false);
            });
    }, []);
    
    useEffect(() => {
        axios.get('http://localhost:8081/PlaylistsNumber')
            .then(response => {
                setPlaylistCount(response.data[0]['COUNT(*)']);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user count:', error);
                setLoading(false);
            });
    }, []);

    const recentUsers = loading ? [] : users.slice(0, 8);

    return (
        
        <div className="main">
                {/* ======================= Cards ================== */}
                <div className="cardBox">
                    <CardDash number={userCount} title='Users' icon='bx-user' />
                    <CardDash number={artistCount} title='Artists' icon='bx-user-check' />
                    <CardDash number={songCount} title='Songs' icon='bx-music' />
                    <CardDash number={playlistCount} title='PlayLists' icon='bxs-playlist' />
                </div>
                {/* ================ Order Details List ================= */}
            <div className="details">
        {!LoadingOrders ?(
        <div className="recentOrders">
            <div className="cardHeader">
                <h2>Orders</h2>
            </div>
            <table>
                <thead>
                    <tr>
                        <td className='text-start'>Name</td>
                        <td className='text-center'>Date</td>
                        <td className='text-center'>Actions</td>
                    </tr>
                </thead>

                <tbody>
                    {
                            orders.map((order) =>
                                <tr key={order.orderId}>
                                    <td>{order.username}</td>
                                    <td className='text-center'>{order.Created_at.substring(0, 10)}</td>
                                    <td className='d-flex justify-content-center my-auto align-items-center'>
                                        {order.state === 0 ? (
                                            <span className="status inProgress">in progress</span>
                                        ) : order.state === 1 ? (
                                            <span className="status return">Declined</span>
                                            ) : (
                                            <span className="status delivered">Accepted</span>
                                        ) }
                                    </td>
                                </tr>
                            )
                        }
                </tbody>
            </table>
                </div>
        ):''}

                    <div className="recentUsers">
                        <div className="cardHeader">
                            <h2>Recent Users</h2>
                        </div>
                    <table>
                        {recentUsers.map((user)=>
                            <tr key={user.id}>
                                <td width="60px">
                                    <div className="imgBx"><img src={`http://localhost:8081/uploads/images/profiles/${user.profileImage}`} alt="" /></div>
                                </td>
                                <td>
                                    <h4>{user.username} <br /><span>{user.Role === 3 ? 'Artist' : 'User'}</span></h4>
                                </td>
                            </tr>
                        )}
                        </table>
                    </div>
                </div>
            </div>
    );
};


export default Dashboard