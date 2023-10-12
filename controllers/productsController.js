

const getAllProductsStatic = async(req,res)=>{
    throw new Error('testing async error')
    res.status(200).json({message:'testing route'})
}
const getAllProducts = async(req,res)=>{
    res.status(200).json({message:' route'})
}

module.exports = {getAllProductsStatic,getAllProducts}