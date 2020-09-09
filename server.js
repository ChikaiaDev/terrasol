const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
var path = require("path");
const jobRouter = require("./routes/jobs");
const adminRouter = require("./routes/admin");

const app = express();
let port = 5500;

mongoose.connect("mongodb://localhost:27017/terrasol", {
  useNewUrlParser: true,
});

//static pages
app.use(express.static(path.join(__dirname, "public")));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/images", express.static(__dirname + "public/images"));

//view engine
app.set("view engine", "ejs");
app.use(
  express.urlencoded({
    extended: false,
  })
);
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/jobs", jobRouter);
app.use("/admin", adminRouter);

app.listen(port, () => console.log("server running on port 5500"));