const express = require("express")
const app = express()
const axios = require("axios")
const cors = require("cors")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient
app.use(express.json())
app.use(cors("*"))
app.get("/viewlocations",async (req,res)=>{
    const locations= await prisma.location.findMany()
    res.send(locations)
})
app.post("/locations", async (req, res) => {
    const { name } = req.body;
  
    try {
      const location = await prisma.location.create({
        data: { name },
      });
      res.status(201).json(location);
    } catch (error) {
      res.status(500).send("Error creating location");
    }
  });
  app.get("/locations/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const location = await prisma.location.findUnique({
            where: { id: parseInt(id, 10) }
        });
        if (location) {
            res.status(200).json(location);
        } else {
            res.status(404).json({ error: "Location not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.listen(6000, () => {
    console.log("Location service started on port 6000");
});