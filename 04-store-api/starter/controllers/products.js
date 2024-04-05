const Products = require('../models/Product');

const getAllProducts = async (req, res) => {
  const {
    featured,
    name,
    company,
    sort,
    select,
    limit,
    page,
    numericFilters
  }  = req.query;

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

  if(numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '<': '$lt',
      '<=': '$lte',
      '=': '$eq',
    }

    const regEx = /\b(>|>=|=|<|<=)\b/g;
    const numericFields = ['price', 'rating'];
    const filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
    filters.split(',').forEach((filter) => {
      const [field, operator, value] = filter.split('-');
      if(numericFields.includes(field))
        queryObject[field] = {[operator]: Number(value)};
    })

  }

  console.log('---');
  console.log(queryObject);
  const sortQuery = sort ? sort.split(',').join(' ') : '-createdAt';
  let query = Products.find(queryObject).sort(sortQuery);

  if(select) {
    query = query.select(select.split(',').join(' '));
  }

  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || 10;
  const skipNumber = (pageNumber - 1) * limitNumber;


  query = query.skip(skipNumber).limit(limitNumber);

  const products = await query;
  res.status(200).json({nbHits: products.length, products});
}

module.exports = {
  getAllProducts,
}