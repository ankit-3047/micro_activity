const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// Base URL for the Location service
const LOCATION_SERVICE_URL = "http://localhost:6000";

// Function to validate locationId
async function validateLocation(locationId) {
    if (!locationId) return; // If locationId is optional, skip validation

    try {
        const response = await axios.get(`${LOCATION_SERVICE_URL}/locations/${locationId}`);
        return response.data; // Return location details if valid
    } catch (error) {
        throw new Error('Invalid locationId');
    }
}

// GET endpoint to view all plans
app.get("/viewplans", async (req, res) => {
    try {
        const plans = await prisma.plan.findMany(); // Note the correct model name
        res.status(200).json(plans);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// POST endpoint to add a new plan
app.post("/addplan", async (req, res) => {
    const { planName, amount, locationId } = req.body;

    // Basic validation
    if (!planName || amount == null) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // Validate locationId by calling the Location service
        await validateLocation(locationId);

        await prisma.plan.create({
            data: {
                planName,
                amount,
                locationId, // Include locationId if you are using it
            },
        });

        res.status(201).json({ message: "Plan added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
app.get('/plans/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const plan = await prisma.plan.findUnique({
            where: { id: parseInt(id, 10) }
        });
        if (plan) {
            res.status(200).json(plan);
        } else {
            res.status(404).json({ message: 'Plan not found' });
        }
    } catch (error) {
        console.error('Error fetching plan:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Start the server
app.listen(5000, () => {
    console.log("Plans server started on port 5000");
});
