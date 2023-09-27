const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());


const PORT = 3300;


app.listen(PORT, () => {
    console.log(`server is running port : ${PORT}`)
});