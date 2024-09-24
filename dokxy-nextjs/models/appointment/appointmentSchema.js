import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    slug:{
        type: String,
        required: true,
    },
    doctorName: {
        type: String,
        required: true,
    },
    doctorEmail: {
        type: String,
        required: true,
    },
    patientName: {
        type: String,
        required: true,
    },
    patientEmail: {
        type: String,
        required: true,
    },
    appointmentDate: {
        type: Date,
        required: true,
    },
    appointmentTime: {
        type: String,
        required: true,
    },
    appointmentType: {
        type: String,
        required: true,
    },
    appointmentStatus: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);

export default Appointment;