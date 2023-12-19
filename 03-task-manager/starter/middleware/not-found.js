const notFound = (req, res, next) => res.status(404).json({ error: 'Sorry man' });
module.exports = notFound;