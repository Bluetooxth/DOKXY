import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  imageURL:{
    type: String,
    default: "https://img.freepik.com/free-vector/doctor-medical-healthcare-pfrofessional-character-vector_53876-175176.jpg?w=826&t=st=1727449959~exp=1727450559~hmac=fe7407c7176d96eedb36b1a0c75341a453ae1295385ec389b9e286b49608c67e"
  },
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
    sparse: true,
    default: "",
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
});

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;