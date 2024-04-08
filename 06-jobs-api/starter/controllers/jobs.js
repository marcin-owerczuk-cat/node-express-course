const Job = require('../models/Job');
const {StatusCodes} = require("http-status-codes");

const getAllJobs = async (req, res) => {
  const { id } = req.user;
  const jobs = await Job.find({ createdBy: id }).sort('createdAt')
  res.json(jobs.map(job => ({
    id: job._id,
    title: job.title,
    description: job.description,
  })));
}

const getJob = async( req, res) => {
  const { id: userId } = req.user;
  const { id: jobId } = req.params;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });

  if(!job) {
    return res.status(StatusCodes.NOT_FOUND).send('Job not found');
  }
  res.json({id: job._id, title: job.title, description: job.description});
}

const createJob = async (req, res) => {
  const { id } = req.user;
  const job = await Job.create({
    title: req.body.title,
    description: req.body.description,
    createdBy: id,
  });

  res.status(StatusCodes.CREATED).json({ job });
}

const updateJob = async (req, res) => {
  res.send('updateJob');
}

const deleteJob = async (req, res) => {
  res.send('deleteJob');
}

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
}
