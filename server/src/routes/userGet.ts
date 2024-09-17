import User from "../models/userModel";
import getDataFromToken from "../helpers/getDataFromToken";

export async function handleGetUser(c: any) {
  try {
    const tokenData = getDataFromToken(c.req);
    const { email } = tokenData;

    if (!email) {
      return c.json({ message: "Email not found in token" }, 400);
    }

    const user = await User.findOne({ email });

    return c.json(user, 200);
  } catch (error) {
    return c.json({ message: "Internal server error" }, 500);
  }
}