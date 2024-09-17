import Appointment from '../models/appointmentModel';

export async function handleCompleteAppointment(c: any) {
  const { slug } = await c.req.json();

  if (!slug) {
    return c.json({ message: 'Appointment identifier is required' }, 400);
  }

  try {
    const appointment = await Appointment.findOne({ slug });

    if (!appointment) {
      return c.json({ message: 'Appointment not found' }, 404);
    }

    if (appointment.appointmentStatus === 'completed') {
      return c.json({ message: 'Appointment is already marked as completed' }, 400);
    }

    appointment.appointmentStatus = 'completed';
    await appointment.save();

    return c.json({ message: 'Appointment marked as completed successfully' }, 200);
  } catch (error) {
    return c.json({ message: 'Internal server error' }, 500);
  }
}