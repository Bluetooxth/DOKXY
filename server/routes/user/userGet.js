import User from "../../models/user/userSchema";
import getDataFromToken from "../../helpers/getDataFromToken";

export async function handleGetUser(req, res) {
  try {
    const tokenData = getDataFromToken(req);
    const { email } = tokenData;

    if (!email) {
      return res.status(400).json({ message: "Email not found in token" });
    }

    const user = await User.findOne({ email });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}