const Products = require('../models/Product');

const getAllProducts = async (req, res) => {
  const { featured, name, company, sort }  = req.query;
  console.log(featured);
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === 'true';
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  if (company) {
    queryObject.company = company;
  }


  const query = Products.find(queryObject);

  if(sort) {
    query.sort(sort.split(',').join(' '));
  }
  const products = await query;

  res.status(200).json({nbHits: products.length, products});
}

module.exports = {
  getAllProducts,
}