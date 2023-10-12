const notFound = (req,res)=> res.status(404).send("Route dosent exists")

module.exports = notFound