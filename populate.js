const Product = require('./models/product')
const connectDB = require('./utils/connectDB')

require('dotenv').config()

const jsonProducts = require('./products.json')


const start = async()=>{
    try {
        await connectDB()
        Product.deleteMany()
        Product.create(jsonProducts)
       console.log('success') 
       process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
start()