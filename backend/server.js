require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Appointment = require("./models/Appointment");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for demo reliability (if MongoDB is busy or not installed)
let appointments = [];

// Routes
app.use("/api/ai", require("./routes/ai"));

app.post("/api/appointments", async (req, res) => {
  try {
    const { name, phone, department, doctor, date, time, message } = req.body;
    
    // Simulate real booking delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const appointment = {
      id: Date.now().toString(),
      name,
      phone,
      department,
      doctor,
      date,
      time,
      message,
      status: "Pending",
      createdAt: new Date(),
    };

    appointments.unshift(appointment); // Add to local array
    res.status(201).json({ success: true, message: "Appointment booked successfully!", data: appointment });
  } catch (err) {
    console.error("Error booking appointment:", err);
    res.status(500).json({ success: false, message: "Server Error: Could not book appointment." });
  }
});

app.get("/api/appointments", async (req, res) => {
  try {
    res.status(200).json({ success: true, data: appointments });
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ success: false, message: "Server Error: Could not fetch appointments." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
