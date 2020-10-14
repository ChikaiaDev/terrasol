const express = require("express");
const router = express.Router();
const app = express();
const Job = require("../../models/job");

// jobs section
router.get("/", async (req, res) => {
  const jobs = await Job.find().sort({
    createdAt: "desc",
  });
  res.render("admin/index", {
    jobs: jobs,
  });
});

module.exports = router;