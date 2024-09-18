import Doctor from "../../models/doctor/doctorSchema";
import getDataFromToken from "../../helpers/getDataFromToken";

export async function handleGetDoctor(req, res) {
    try {
      const tokenData = getDataFromToken(req);
      const { email } = tokenData;
  
      if (!email) {
        return res.status(400).json({ message: "Email not found in token" });
      }
  
      const doctor = await Doctor.findOne({ email });
  
      return res.status(200).json(doctor);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }