import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import dotenv from 'dotenv';
import databaseConnection from './config/db';
import { handleBookAppointment } from './routes/appointmentBook';
import { handleDeleteAppointment } from './routes/appointmentDelete';
import { handleGetAppointment } from './routes/appointmentGet';
import { handleConfirmAppointment } from './routes/appointmentConfirm';
import { handleCompleteAppointment } from './routes/appointmentCompleted';
import { handleDoctorLogin } from './routes/doctorLogin';
import { handleDoctorSignup } from './routes/doctorSignUp';
import { handleDoctorUpdate } from './routes/doctorUpdate';
import { handleGetDoctor } from './routes/doctorGet';
import { handleGetDoctors } from './routes/doctorsGet';
import { handleUserLogin } from './routes/userLogin';
import { handleUserSignup } from './routes/userSignUp';
import { handleUserUpdate } from './routes/userUpdate';
import { handleGetUser } from './routes/userGet';
import { handleLogout } from './routes/logout';
import { handleGetData } from './routes/getData';

dotenv.config();

const app = new Hono();

databaseConnection();

const port = parseInt(process.env.PORT || '3000', 10);

app.post('/book-appointment', handleBookAppointment);
app.post('/delete-appointment', handleDeleteAppointment);
app.post('/confirm-appointment', handleConfirmAppointment);
app.post('/complete-appointment', handleCompleteAppointment);
app.post('/get-appointment', handleGetAppointment);
app.post('/doctor-login', handleDoctorLogin);
app.post('/doctor-signup', handleDoctorSignup);
app.post('/doctor-update', handleDoctorUpdate);
// app.post('/get-doctor', handleGetDoctor);
app.post('/get-doctors', handleGetDoctors);
app.post('/user-login', handleUserLogin);
app.post('/user-signup', handleUserSignup);
app.post('/user-update', handleUserUpdate);
// app.post('/get-user', handleGetUser);
app.post('/logout', handleLogout);
app.post('/get-data', handleGetData);

serve({
  fetch: app.fetch,
  port,
});

console.log(`Server is running on port ${port}`);