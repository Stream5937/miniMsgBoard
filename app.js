//import express
const express = require("express");
//import Path CommonJS module
const path = require("node:path");
//create server
const app = express();
//create router
const router = express.Router();
//set assets path
const assetsPath = path.join(__dirname, "public");
//import routes
const indexRouter = require("./routes/indexRouter.js");
const aboutRouter = require("./routes/aboutRouter.js");

//set app properties & register view engine
app.set("views", path.join(__dirname, "views"));
// register view engine
app.set("view engine", "ejs");

//routes

//middleware
app.use(express.static(assetsPath));
app.use("/", indexRouter);
app.use("/about", aboutRouter);

//data
const links = [
  { href: "/", text: "Home" },
  { href: "about", text: "About" },
];
// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404", links: links });
});

const PORT = 3000;
app.listen(PORT, (error) => {
  //error
  if (error) {
    console.log(
      `My MiniMessageBoard Express app - FAILED listening on port ${PORT}!`
    );
  }
  console.log(`My MiniMessageBoard Express app - listening on port ${PORT}!`);
});
