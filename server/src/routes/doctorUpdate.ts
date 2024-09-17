import Doctor from '../models/doctorModel';
import bcrypt from 'bcryptjs';
import getDataFromToken from '../helpers/getDataFromToken';

export async function handleDoctorUpdate(c: any) {
  try {
    const tokenData = getDataFromToken(c.req);
    const { email } = tokenData;

    if (!email) {
      return c.json({ message: 'Email not found in token' }, 400);
    }

    const { name, password, specialization, yearsOfExperience, phoneNumber, address, imageUrl } = await c.req.json();

    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return c.json({ message: 'Doctor not found' }, 404);
    }

    if (name !== undefined) {
      doctor.name = name;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      doctor.password = hashedPassword;
    }

    if (specialization !== undefined) {
      doctor.specialization = specialization;
    }

    if (yearsOfExperience !== undefined) {
      doctor.yearsOfExperience = yearsOfExperience;
    }

    if (phoneNumber !== undefined) {
      doctor.phoneNumber = phoneNumber;
    }

    if (address !== undefined) {
      doctor.address = address;
    }

    if (imageUrl !== undefined) {
      doctor.imageUrl = imageUrl;
    }

    await doctor.save();

    return c.json({ message: 'Doctor updated successfully' }, 200);
  } catch (error) {
    return c.json({ message: 'Internal server error' }, 500);
  }
}