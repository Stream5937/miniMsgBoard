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
//const aboutRouter = require("./routes/aboutRouter.js");
//const newMsgRouter = require("./routes/newMsgRouter.js");
//for redirect with variables
const url = require("url");

//set app properties & register view engine
app.set("views", path.join(__dirname, "views"));
// register view engine
app.set("view engine", "ejs");

//routes

//middleware
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
//app.use("/about", aboutRouter);
//app.use("/new", newMsgRouter);

//data
const links = [
  { href: "/", text: "Home" },
  { href: "about", text: "About" },
  { href: "new", text: "Create new message" },
];

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

// index route is handled by routes/indexRouter.js

app.get("/about", (req, res) => {
  // render the 'about' view (no leading slash)
  res.render("about", { title: "About", links: links });
});

/*
const url = require('url');    
app.get('/category', function(req, res) {
    res.redirect(url.format({
       pathname:"/",
       query: {
          "a": 1,
          "b": 2,
          "valid":"your string here"
        }
     }));
 });
*/
//redirect with variable
app.get("/new", (req, res) => {
  // render the 'new' view (no leading slash)
  //res.redirect("/", { title: "new", links: links });
  res.redirect(
    url.format({
      pathname: "/",
      query: { create: true },
    })
  );
});
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
  } else {
    console.log(`My MiniMessageBoard Express app - listening on port ${PORT}!`);
  }
});
