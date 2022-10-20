// Module Imports
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

// Configurations for the Backend
dotenv.config();

const app = express();
const PORT = process.env.PORT || 80;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Route Imports
import studentRoutes from './routes/student.js';
import teacherRoutes from './routes/teacher.js';
import nonTeacherRoutes from './routes/nonTeacher.js';






// Route Settings
app.use('/student',studentRoutes);
app.use('/teacher',teacherRoutes);
app.use('/nonTeacher',nonTeacherRoutes);



app.get('/',(req,res) => {
    res.send("Home Page")
})

app.listen(PORT,() => {
    console.log(`Server Listening at http://localhost:${PORT}`);
})
