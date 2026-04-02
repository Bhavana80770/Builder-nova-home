import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  department: String,
  doctor: String,
  date: String,
  time: String,
  language: { type: String, default: "EN" },
  status: { type: String, default: "Booked" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Appointment", appointmentSchema);
