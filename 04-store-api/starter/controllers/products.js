
const getAllProducts = async (req, res) => {
  res.json({
    message: 'All products fetched successfully',
  })
}

module.exports = {
  getAllProducts,
}