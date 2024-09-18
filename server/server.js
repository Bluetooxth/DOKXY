import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

// importing routes

import { handleUserLogin } from "./routes/user/userLogin.js";
import { handleUserSignup } from "./routes/user/userSignUp.js";
import { handleUserUpdate } from "./routes/user/userUpdate.js";
import { handleGetUser } from "./routes/user/userGet.js";

import { handleDoctorLogin } from "./routes/doctor/doctorLogin.js";
import { handleDoctorSignup } from "./routes/doctor/doctorSignUp.js";
import { handleDoctorUpdate } from "./routes/doctor/doctorUpdate.js";
import { handleGetDoctor } from "./routes/doctor/doctorGet.js";
import { handleGetDoctors } from "./routes/doctor/doctorsGet.js";

import { handleBookAppointment } from "./routes/appointment/bookAppointment.js";
import { handleDeleteAppointment } from "./routes/appointment/deleteAppointment.js";
import { handleConfirmAppointment } from "./routes/appointment/confirmAppointment.js";
import { handleCompleteAppointment } from "./routes/appointment/completeAppointment.js";
import { handleGetAppointment } from "./routes/appointment/getAppointment.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(cookieParser());

// route handling

app.post("/api/user/login", handleUserLogin);
app.post("/api/user/signup", handleUserSignup);
app.get("/api/user", handleGetUser);
app.put("/api/user/update", handleUserUpdate);

app.post("/api/doctor/login", handleDoctorLogin);
app.post("/api/doctor/signup", handleDoctorSignup);
app.get("/api/doctor", handleGetDoctor);
app.get("/api/doctors", handleGetDoctors);
app.put("/api/doctor/update", handleDoctorUpdate);

app.post("/api/appointment/book", handleBookAppointment);
app.get("/api/appointment", handleGetAppointment);
app.put("/api/appointment/complete", handleCompleteAppointment);
app.put("/api/appointment/confirm", handleConfirmAppointment);
app.delete("/api/appointment", handleDeleteAppointment);

// check api status

app.get("/api/status", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});