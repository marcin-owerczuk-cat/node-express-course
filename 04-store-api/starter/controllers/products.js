const asyncWrapper = require('../middleware/async-wrapper');

const getAllProducts = asyncWrapper(
    async (req, res) => {
      res.json({
        message: 'All products fetched successfully',
      })
    }
)

module.exports = {
  getAllProducts,
}