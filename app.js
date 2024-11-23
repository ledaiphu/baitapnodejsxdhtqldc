import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [bookings, setBookings] = useState([]);
    const [newBooking, setNewBooking] = useState({ customerName: '', date: '', time: '' });

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        const response = await axios.get('http://localhost:3000/bookings');
        setBookings(response.data);
    };

    const addBooking = async () => {
        await axios.post('http://localhost:3000/bookings', newBooking);
        fetchBookings();
    };

    const updateStatus = async (id, status) => {
        await axios.put(`http://localhost:3000/bookings/${id}`, { status });
        fetchBookings();
    };

    const deleteBooking = async (id) => {
        await axios.delete(`http://localhost:3000/bookings/${id}`);
        fetchBookings();
    };

    return (
        <div>
            <h1>Booking System</h1>
            <div>
                <h2>Add Booking</h2>
                <input
                    type="text"
                    placeholder="Customer Name"
                    onChange={e => setNewBooking({ ...newBooking, customerName: e.target.value })}
                />
                <input
                    type="date"
                    onChange={e => setNewBooking({ ...newBooking, date: e.target.value })}
                />
                <input
                    type="time"
                    onChange={e => setNewBooking({ ...newBooking, time: e.target.value })}
                />
                <button onClick={addBooking}>Add</button>
            </div>
            <h2>Bookings</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(booking => (
                        <tr key={booking.id}>
                            <td>{booking.id}</td>
                            <td>{booking.customerName}</td>
                            <td>{booking.date}</td>
                            <td>{booking.time}</td>
                            <td>{booking.status}</td>
                            <td>
                                <button onClick={() => updateStatus(booking.id, 'Confirmed')}>Confirm</button>
                                <button onClick={() => updateStatus(booking.id, 'Cancelled')}>Cancel</button>
                                <button onClick={() => deleteBooking(booking.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
