const mongoose = require('mongoose')
MONGO_URI = process.env.MONGO_URI

const connectToDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Database is connected successfully!")
    } catch (err) {
        console.error('Failed to connect to db', err)
        process.exit(1)
    }
}

module.exports = connectToDB
