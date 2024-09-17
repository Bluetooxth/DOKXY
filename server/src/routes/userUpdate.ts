import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import getDataFromToken from '../helpers/getDataFromToken';

export async function handleUserUpdate(c: any) {
  try {
    const tokenData = getDataFromToken(c.req);
    const { email } = tokenData;

    if (!email) {
      return c.json({ message: 'Email not found in token' }, 400);
    }

    const { name, password, phoneNumber, address } = await c.req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return c.json({ message: 'User not found' }, 404);
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

    return c.json({ message: 'User updated successfully' }, 200);
  } catch (error) {
    return c.json({ message: 'Internal server error' }, 500);
  }
}