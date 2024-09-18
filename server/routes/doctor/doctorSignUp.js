import Doctor from "../../models/doctor/doctorSchema.js";
import bcrypt from 'bcryptjs';

export async function handleDoctorSignup(req, res) {
  const { name, email, password, specialization, yearsOfExperience } = req.body;

  if (!name || !email || !password || !specialization || !yearsOfExperience) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingDoctor = await Doctor.findOne({ email });

    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const doctor = await Doctor.create({
      name,
      email,
      password: hashedPassword,
      specialization,
      yearsOfExperience,
    });

    return res.status(201).json({ message: 'Doctor signup successful' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}