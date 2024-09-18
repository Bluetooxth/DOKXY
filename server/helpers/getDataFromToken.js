import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function getDataFromToken(req) {
  try {
    const token = req.cookies.token || "";

    if (!token) {
      throw new Error("No token provided");
    }

    const data = jwt.verify(token, process.env.JWT_SECRET || "");

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    };
  } catch (error) {
    throw new Error("Invalid token");
  }
}

export default getDataFromToken;