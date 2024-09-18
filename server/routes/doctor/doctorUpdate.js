import Doctor from "../../models/doctor/doctorSchema.js";
import bcrypt from 'bcryptjs';
import getDataFromToken from '../helpers/getDataFromToken.js';

export async function handleDoctorUpdate(req, res) {
  try {
    const tokenData = getDataFromToken(req);
    const { email } = tokenData;

    if (!email) {
      return res.status(400).json({ message: 'Email not found in token' });
    }

    const { name, password, specialization, yearsOfExperience, phoneNumber, address, imageUrl } = req.body;

    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
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

    return res.status(200).json({ message: 'Doctor updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}