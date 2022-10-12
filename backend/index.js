import express from 'express';

import dotenv from 'dotenv';
dotenv.config();


const PORT = process.env.PORT || 81;
const app = express();


app.get('/',(req,res) => {
    res.send("Hello World");
});


app.listen(PORT,() => {
    console.log(`Server Listening at http://localhost:${PORT}`);
})