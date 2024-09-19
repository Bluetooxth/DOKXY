import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
    default: "N/A",
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "doctor",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'uploads.files',
  },
});

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;