import jwt from "jsonwebtoken";

export async function getDataFromToken(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return { status: 401, error: "Token not found" };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return {
      status: 200,
      data: {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      },
    };
  } catch (error) {
    return { status: 401, error: "Invalid token" };
  }
}
