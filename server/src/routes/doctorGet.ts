import Doctor from "../models/doctorModel";
import getDataFromToken from "../helpers/getDataFromToken";

export async function handleGetDoctor(c: any) {
  try {
    const tokenData = getDataFromToken(c.req);
    const { email } = tokenData;

    if (!email) {
      return c.json({ message: "Email not found in token" }, 400);
    }

    const doctor = await Doctor.findOne({ email });

    return c.json(doctor, 200);
  } catch (error) {
    return c.json({ message: "Internal server error" }, 500);
  }
}