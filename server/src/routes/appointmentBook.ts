import Appointment from '../models/appointmentModel';

export async function handleBookAppointment(c: any) {
  const {
    doctorName,
    doctorEmail,
    patientName,
    patientEmail,
    appointmentDate,
    appointmentTime,
    appointmentType,
    appointmentStatus,
  } = await c.req.json();

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
    return c.json({ message: 'All fields are required' }, 400);
  }

  try {
    const slug = `${doctorName}-${appointmentDate}-${appointmentTime}`;

    const existingAppointment = await Appointment.findOne({ slug });

    if (existingAppointment) {
      return c.json({ message: 'Appointment already booked at this time' }, 409);
    }

    const appointment = await Appointment.create({
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

    return c.json({ message: 'Appointment booked successfully' }, 201);
  } catch (error) {
    return c.json({ message: 'Internal server error' }, 500);
  }
}