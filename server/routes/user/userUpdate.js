import User from "../../models/user/userSchema";
import bcrypt from 'bcryptjs';
import getDataFromToken from "../../helpers/getDataFromToken";

export async function handleUserUpdate(req, res) {
  try {
    const tokenData = getDataFromToken(req);
    const { email } = tokenData;

    if (!email) {
      return res.status(400).json({ message: 'Email not found in token' });
    }

    const { name, password, phoneNumber, address } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name !== undefined) {
      user.name = name;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
    }

    if (phoneNumber !== undefined) {
      user.phoneNumber = phoneNumber;
    }

    if (address !== undefined) {
      user.address = address;
    }

    await user.save();

    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}