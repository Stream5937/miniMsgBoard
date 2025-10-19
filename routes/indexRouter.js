const { Router } = require("express");

const indexRouter = Router();

//data
const links = [
  { href: "/", text: "Home" },
  { href: "/about", text: "About" },
];

indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Home", links: links });
});

module.exports = indexRouter;
