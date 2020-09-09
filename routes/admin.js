const express = require("express");
const router = express.Router();
const app = express();
const Job = require("./../models/job");

router.get("/", (req, res) => {

    res.render("admin/index");
});



module.exports = router;