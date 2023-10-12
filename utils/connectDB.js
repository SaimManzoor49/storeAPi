const mongoose = require('mongoose')

module.exports = connectDB = async()=>{
try {
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected to DB");
    })
} catch (error) {
    console.log(" error while connerting to DB \n " +error)
}
}