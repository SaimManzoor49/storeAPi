const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).limit(4);
  res.status(200).json({ message: "testing route", data: products });
};
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, priceFilters } = req.query;
  const queryObject = {};
  //filter featured
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  //filter Company
  if (company) {
    queryObject.company = company;
  }
  //filter Name
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }


  // filter price and ratings

  if (priceFilters) {
    const operatorMap = {
      ">": "$gt",
      "<": "$lt",
      ">=": "$gte",
      "<=": "$lte",
      "=": "$eq",
    };

    const regEx = /\b(<|>|>=|<=|=)\b/g;

    let filters = priceFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
    // console.log(queryObject)
  }


  let result = Product.find(queryObject);

  //sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    // console.log(sort)
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  // selected Fields
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    console.log(fieldsList);
    result = result.select(fieldsList);
  }


  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  let products = await result;

  res
    .status(200)
    .json({ message: "success", data: products, nHits: products.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
