import Doctor from "../models/doctorModel";

export async function handleGetDoctors(c: any) {
  try {
    const doctor = await Doctor.find();

    return c.json(doctor, 200);
  } catch (error) {
    return c.json({ message: "Internal server error" }, 500);
  }
}