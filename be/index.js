require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());


const userRoute = require('./src/routes/user')


app.use('/user', userRoute)

const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`server is running port : ${PORT}`)
});