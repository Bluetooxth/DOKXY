import Appointment from '../models/appointmentModel';

export async function handleConfirmAppointment(c: any) {
  const { slug } = await c.req.json();

  if (!slug) {
    return c.json({ message: 'Appointment identifier is required' }, 400);
  }

  try {
    const appointment = await Appointment.findOne({ slug });

    if (!appointment) {
      return c.json({ message: 'Appointment not found' }, 404);
    }

    if (appointment.appointmentStatus === 'confirmed') {
      return c.json({ message: 'Appointment is already confirmed' }, 400);
    }

    appointment.appointmentStatus = 'confirmed';
    await appointment.save();

    return c.json({ message: 'Appointment confirmed successfully' }, 200);
  } catch (error) {
    return c.json({ message: 'Internal server error' }, 500);
  }
}