import Appointment from "../models/appointmentModel";
import getDataFromToken from "../helpers/getDataFromToken";

export async function handleGetAppointment(c: any) {
  try {
    const tokenData = getDataFromToken(c.req);
    const { email } = tokenData;

    if (!email) {
      return c.json({ message: "Email not found in token" }, 400);
    }

    const appointments = await Appointment.find({ email });

    return c.json(appointments, 200);
  } catch (error) {
    return c.json({ message: "Internal server error" }, 500);
  }
}