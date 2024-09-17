import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface DataFromToken {
    id: string;
    name: string;
    email: string;
    role: string;
}

const getDataFromToken = (req: any):DataFromToken => {
    try {
        const token = req.cookies.get("token")?.value || "";

        if (!token) {
            throw new Error("No token provided");
        }

        const data = jwt.verify(token, process.env.JWT_SECRET || "") as DataFromToken;

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