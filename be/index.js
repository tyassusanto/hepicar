require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());


const userRoute = require('./src/routes/user')
const serviceRoute = require('./src/routes/services')


app.use('/user', userRoute)
app.use('/services', serviceRoute)

const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`server is running port : ${PORT}`)
});