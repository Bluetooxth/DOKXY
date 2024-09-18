import Doctor from "../../models/doctor/doctorSchema";

export async function handleGetDoctors(req, res) {
    try {
      const doctors = await Doctor.find();
  
      return res.status(200).json(doctors);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }