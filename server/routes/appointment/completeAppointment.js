import Appointment from "../../models/appointment/appointmentSchema";

export async function handleCompleteAppointment(req, res) {
    const { slug } = req.body;
  
    if (!slug) {
      return res.status(400).json({ message: 'Appointment identifier is required' });
    }
  
    try {
      const appointment = await Appointment.findOne({ slug });
  
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
  
      if (appointment.appointmentStatus === 'completed') {
        return res.status(400).json({ message: 'Appointment is already marked as completed' });
      }
  
      appointment.appointmentStatus = 'completed';
      await appointment.save();
  
      return res.status(200).json({ message: 'Appointment marked as completed successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }