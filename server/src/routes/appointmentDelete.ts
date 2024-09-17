import Appointment from '../models/appointmentModel';

export async function handleDeleteAppointment(c: any) {
  const { slug } = await c.req.json();

  if (!slug) {
    return c.json({ message: 'All fields are required' }, 400);
  }

  try {
    const appointment = await Appointment.findOneAndDelete({ slug });

    if (!appointment) {
      return c.json({ message: 'Appointment does not exist' }, 404);
    }

    return c.json({ message: 'Appointment deleted successfully' }, 200);
  } catch (error) {
    return c.json({ message: 'Internal server error' }, 500);
  }
}