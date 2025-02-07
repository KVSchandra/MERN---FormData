require('dotenv').config()
const express = require('express')
const connectToDB = require('./database/db')
const userRoutes = require('./routes/user-routes')
const cors = require('cors')

const app = express()
app.use(express.json());
connectToDB()
app.use(cors({
    origin: "https://mern-formdata-1-backend.onrender.com", 
    credentials: true,
}));

app.use('/api/user', userRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})
