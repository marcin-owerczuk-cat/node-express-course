const express = require('express')
const authenticationMiddleware = require('../middleware/authentication');

const router = express.Router()
const { getAllJobs, getJob, createJob, updateJob, deleteJob } = require('../controllers/jobs');

router.use(authenticationMiddleware);

router.route('/')
  .get(getAllJobs)
  .post(createJob);

router.route('/:id')
  .get(getJob)
  .patch(updateJob)
  .delete(deleteJob);

module.exports = router