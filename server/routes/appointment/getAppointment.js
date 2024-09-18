import Appointment from "../../models/appointment/appointmentSchema";
import getDataFromToken from "../../helpers/getDataFromToken";

export async function handleGetAppointment(req, res) {
    try {
      const tokenData = getDataFromToken(req);
      const { email } = tokenData;
  
      if (!email) {
        return res.status(400).json({ message: "Email not found in token" });
      }
  
      const appointments = await Appointment.find({ email });
  
      return res.status(200).json(appointments);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }