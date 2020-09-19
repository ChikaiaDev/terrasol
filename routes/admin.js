const express = require("express");
const router = express.Router();
const app = express();
const Job = require("./../models/job");

// jobs section
router.get("/", async (req, res) => {
  const jobs = await Job.find().sort({
    createdAt: "desc",
  });
  res.render("admin/index", {
    jobs: jobs,
  });
});
router.get("/jobs/:slug", async (req, res) => {
  const job = await Job.findOne({
    slug: req.params.slug,
  });

  if (job == null) res.redirect("/");
  res.render("admin/jobs/show", {
    job: job,
  });
});

module.exports = router;
