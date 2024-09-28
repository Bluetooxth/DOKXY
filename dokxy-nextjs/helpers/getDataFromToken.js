import jwt from "jsonwebtoken";

export async function getDataFromToken(req) {
  const token = req.cookies.get("token")?.value || "";

  if (!token) {
    return { status: 401, error: "No token provided" };
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return {
      status: 200,
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
      },
    };
  } catch (error) {
    return { status: 401, error: "Invalid token" };
  }
}