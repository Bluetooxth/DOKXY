import getDataFromToken from "../helpers/getDataFromToken";
import User from "../models/userModel";
import Doctor from "../models/doctorModel";

export async function handleGetData(c: any) {
  const tokenData = getDataFromToken(c.req);

  if (!tokenData || !tokenData.role) {
    return c.json({ message: "Invalid or missing token" }, 401);
  }

  const role = tokenData.role;

  try {
    if (role === "user") {
      const user = await User.findOne({ email: tokenData.email });
      if (!user) {
        return c.json({ message: "User not found" }, 404);
      }
      return c.json(user, 200);
    } else if (role === "doctor") {
      const doctor = await Doctor.findOne({ email: tokenData.email });
      if (!doctor) {
        return c.json({ message: "Doctor not found" }, 404);
      }
      return c.json(doctor, 200);
    } else {
      return c.json({ message: "Role not found in token" }, 400);
    }
  } catch (error) {
    console.error(error);
    return c.json({ message: "Internal server error" }, 500);
  }
}