import express from "express";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// CREATE APPOINTMENT
router.post("/", async (req, res) => {
  try {
    const { name, phone, department, doctor, date, time, language } = req.body;

    // Basic Validation
    if (!name || !phone) {
      return res.status(400).json({ 
        success: false, 
        error: "Missing required fields: name and phone are mandatory." 
      });
    }

    const appointment = new Appointment({
      name,
      phone,
      department,
      doctor,
      date,
      time,
      language: language || "EN"
    });

    await appointment.save();
    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    console.error("Create Appointment Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET ALL APPOINTMENTS
router.get("/", async (req, res) => {
  try {
    const data = await Appointment.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (error) {
    console.error("Get Appointments Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
