import Doctor from '../models/doctorModel';
import bcrypt from 'bcryptjs';

export async function handleDoctorSignup(c: any) {
  const { name, email, password, specialization, yearsOfExperience } = await c.req.json();

  if (!name || !email || !password || !specialization || !yearsOfExperience) {
    return c.json({ message: 'All fields are required' }, 400);
  }

  try {
    const existingDoctor = await Doctor.findOne({ email });

    if (existingDoctor) {
      return c.json({ message: 'Doctor already exists' }, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const doctor = await Doctor.create({
      name,
      email,
      password: hashedPassword,
      specialization,
      yearsOfExperience,
    });

    return c.json({ message: 'Doctor signup successful' }, 201);
  } catch (error) {
    return c.json({ message: 'Internal server error' }, 500);
  }
}