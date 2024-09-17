import User from '../models/userModel';
import bcrypt from 'bcryptjs';

export async function handleUserSignup(c: any) {
  const { name, email, password } = await c.req.json();

  if (!name || !email || !password) {
    return c.json({ message: 'All fields are required' }, 400);
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return c.json({ message: 'User already exists' }, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return c.json({ message: 'User signup successful' }, 201);
  } catch (error) {
    return c.json({ message: 'Internal server error' }, 500);
  }
}