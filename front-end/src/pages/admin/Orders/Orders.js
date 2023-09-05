import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Orders = () => {
    const [orders, setOrders] = useState();
    const [Loading, setLoading] = useState(true);
    
    useEffect(() => {
        axios.get('http://localhost:8081/orders')
            .then(response => {
                setOrders(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setLoading(false);
            });
    }, []);

    const updateOrder = (orderId, newState) => {
        axios
            .put(`http://localhost:8081/orders/${orderId}/${newState}`)
            .then((response) => {
            })
            .catch((error) => {
                console.error('Error updating order:', error);
            });
    };

    return (
    <>
        {!Loading ?(
        <div className="playlists my-5">
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
                                            <>
                                                <button className='btn btn-primary me-2' onClick={() => updateOrder(order.orderId, 2)}>
                                                    <i className='bx bx-check text-white'></i>
                                                </button>
                                                <button className='btn btn-danger' onClick={() => updateOrder(order.orderId, 1)}>
                                                    <i className='bx bx-trash text-white'></i>
                                                </button>
                                            </>
                                        ) : order.state === 1 ? (
                                            <button className='btn btn-secondary'>
                                                <i className='bx bx-x text-white'></i>
                                            </button>
                                            ) : (
                                            <button className='btn btn-success'>
                                                <i className='bx bx-check text-white'></i>
                                            </button>
                                        ) }
                                    </td>
                                </tr>
                            )
                        }
                </tbody>
            </table>
                </div>
        ):''}</>
    )
}

export default Orders