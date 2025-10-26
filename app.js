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
const detailsRouter = require("./routes/detailsRouter.js");

//set app properties & register view engine
app.set("views", path.join(__dirname, "views"));
// register view engine
app.set("view engine", "ejs");

//middleware
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use("/about", aboutRouter);
app.use("/details", detailsRouter);

//data
const links = [
  { href: "/", text: "Home" },
  { href: "about", text: "About" },
  { href: "new", text: "Create new message" },
];

/*
app.get("/details", (req, res) => {
  // render the 'about' view (no leading slash)
  res.render("details", { title: "Details", links: links, id: 0 });
});
*/

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404", links: links });
});

//const PORT = 3000;
const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  //error
  if (error) {
    console.log(
      `My MiniMessageBoard Express app - FAILED listening on port ${PORT}!`
    );
  } else {
    console.log(`My MiniMessageBoard Express app - listening on port ${PORT}!`);
  }
});
