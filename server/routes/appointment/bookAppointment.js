import Appointment from "../../models/appointment/appointmentSchema";

export async function handleBookAppointment(req, res) {
    const {
      doctorName,
      doctorEmail,
      patientName,
      patientEmail,
      appointmentDate,
      appointmentTime,
      appointmentType,
      appointmentStatus,
    } = req.body;
  
    if (
      !doctorName ||
      !doctorEmail ||
      !patientName ||
      !patientEmail ||
      !appointmentDate ||
      !appointmentTime ||
      !appointmentType ||
      !appointmentStatus
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const slug = `${doctorName}-${appointmentDate}-${appointmentTime}`;
  
      const existingAppointment = await Appointment.findOne({ slug });
  
      if (existingAppointment) {
        return res.status(409).json({ message: 'Appointment already booked at this time' });
      }
  
      const appointment = new Appointment({
        slug,
        doctorName,
        doctorEmail,
        patientName,
        patientEmail,
        appointmentDate,
        appointmentTime,
        appointmentType,
        appointmentStatus,
      });
  
      await appointment.save();
  
      return res.status(201).json({ message: 'Appointment booked successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }