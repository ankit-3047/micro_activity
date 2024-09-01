// active-plan-service/index.js

const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

const PLAN_SERVICE_URL = 'http://localhost:5000/plans'; // Corrected URL
const LOCATION_SERVICE_URL = 'http://localhost:6000/locations';

// Function to validate locationId
async function validateLocation(locationId) {
    if (!locationId) return; // If locationId is optional, skip validation

    try {
        const response = await axios.get(`${LOCATION_SERVICE_URL}/${locationId}`);
        return response.data; // Return location details if valid
    } catch (error) {
        throw new Error('Invalid locationId');
    }
}

// GET endpoint to view active plans for a given location
app.get('/activeplans/:locationId', async (req, res) => {
    const { locationId } = req.params;
    console.log(locationId);
    
    try {
        // Validate if the location exists
        await validateLocation(locationId);
        console.log("validation done");
        
        // Fetch active plans from the Plan Service
        const response = await axios.get(`${PLAN_SERVICE_URL}/${locationId}`);

        const activePlans = response.data;
        console.log(typeof(response.data));
        console.log(activePlans.length);
        

            

        res.json({ plans: activePlans });
        } 
     catch (error) {
        console.error('Error fetching active plans:', error);
        if (error.response && error.response.status === 404) {
            res.status(404).json({ message: 'Location not found or no active plans found.' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

// Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Active Plan service started on port ${PORT}`);
});
