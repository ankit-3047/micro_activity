import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [locationId, setLocationId] = useState('');
    const [activePlans, setActivePlans] = useState({});
    const [error, setError] = useState('');

    const fetchActivePlans = async () => {
        setError('');
        try {
            const response = await axios.get(`http://localhost:7000/activeplans/${locationId}`);
            const data = response.data;

            console.log('API Response:', data);

            if (data && typeof data === 'object') {
                setActivePlans(data);
            } else {
                console.error('Unexpected response format:', data);
                setError('Unexpected response format');
            }
        } catch (err) {
            console.error('Error fetching active plans:', err);
            setError(err.response?.data?.message || 'An error occurred while fetching active plans.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchActivePlans();
    };

    return (
        <div className="App">
            <h1>View Active Plans</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Location ID:
                    <input
                        type="text"
                        value={locationId}
                        onChange={(e) => setLocationId(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Get Active Plans</button>
            </form>
            {error && <p className="error">{error}</p>}
            <ul>
                {Object.keys(activePlans).length > 0 ? (
                    Object.entries(activePlans).map(([id, plan]) => (
                        <li key={id}>
                            <strong>{plan.planName}</strong> - Rs{plan.amount}
                        </li>
                    ))
                ) : (
                    <p>No active plans available.</p>
                )}
            </ul>
        </div>
    );
};

export default App;