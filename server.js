const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;

const app = express();

//Hbs Partials Support
hbs.registerPartials(__dirname + "/views/partials");

//Website rendering engine
app.set("view engine", "hbs");

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url} `;

  console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to append to server.log");
    }
  });
  next();
});

//Express middleware Helper "MAINTENANCE MODE"
// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
// });

//Express middleware to read from static directory
app.use(express.static(__dirname + "/public"));

//Hbs Helpers
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});
hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageText: "Welcome to the Home Page",
    tagLine: "This is the Home Page tag line"
  });
});

app.get("/about", (req, res) => {
  //res.send("<h1>h1hello Express</h1>");
  res.render("about.hbs", {
    pageText: "Welcome to the About Page",
    tagLine: "This is the About Page tag line"
  });
});

app.get("/bad", (req, res) => {
  //res.send("<h1>h1hello Express</h1>");
  res.send({
    error: "Unable to process that request"
  });
});

//App server port listen
app.listen(port, () => {
  console.log(`Server is up on port${port}`);
});
