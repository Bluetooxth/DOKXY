import Appointment from "../../models/appointment/appointmentSchema";

export async function handleDeleteAppointment(req, res) {
    const { slug } = req.body;
  
    if (!slug) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const appointment = await Appointment.findOneAndDelete({ slug });
  
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment does not exist' });
      }
  
      return res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }