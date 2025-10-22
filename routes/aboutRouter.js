const { Router } = require("express");

const aboutRouter = Router();

//data
const links = [
  { href: "/", text: "&Home" },
  { href: "about", text: "About" },
  { href: "new", text: "Create new message" },
];

// When this router is mounted at '/about' in app.js, use the root path here
aboutRouter.get("/", (req, res) => {
  // render the 'about' view (no leading slash)
  res.render("about", { title: "About", links: links });
});

module.exports = aboutRouter;
