const express = require("express");
const router = express.Router();

const Job = require("./../models/job");
const { route } = require("./admin");
const { syncIndexes } = require("./../models/job");

router.get("/", async (req, res) => {
  const jobs = await Job.find().sort({
    createdAt: "desc",
  });
  res.render("jobs/index", {
    jobs: jobs,
  });
});

//job creation route
router.get("/create", (req, res) => {
  res.render("jobs/create", {
    job: new Job(),
  });
});

//edit a job
router.get("/edit/:id", async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.render("jobs/edit", {
    job: job,
  });
});

//selecting one job
router.get("/:slug", async (req, res) => {
  const job = await Job.findOne({
    slug: req.params.slug,
  });

  if (job == null) res.redirect("/");
  res.render("jobs/show", {
    job: job,
  });
});

//creating a new job
router.post("/", async (req, res) => {
  let job = new Job({
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
  });
  try {
    job = await job.save();
    res.redirect(`/jobs/${job.slug}`);
  } catch (e) {
    console.log(e);
    res.render("/jobs/create", {
      job: Job,
    });
  }
});

//router for editting
router.put(
  "/:id",
  async (req, res, next) => {
    req.job = await Job.findById(req.params.id);
    next();
  },
  saveJobAndRedirect("edit")
);

//delete a job

router.delete("/:id", async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.redirect("/jobs");
});

function saveJobAndRedirect(path) {
  return async (req, res) => {
    let job = req.job;
    job.title = req.body.title;
    job.description = req.body.description;
    job.type = req.body.type;

    try {
      job = await job.save();
      res.redirect(`/jobs/${job.slug}`);
    } catch (e) {
      console.log(e);
      res.render("/jobs/${path}", {
        job: Job,
      });
    }
  };
}
module.exports = router;
