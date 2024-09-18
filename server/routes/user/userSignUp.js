import User from "../../models/user/userSchema.js";
import bcrypt from 'bcryptjs';

export async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: 'User signup successful' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}