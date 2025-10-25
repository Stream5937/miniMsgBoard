const { Router } = require("express");

const aboutRouter = Router();

//data
const links = [
  { href: "/", text: "Home" },
  { href: "about", text: "About" },
  { href: "new", text: "Create new message" },
];

// When this router is mounted at '/about' in app.js, use the root path here
aboutRouter.get("/", (req, res) => {
  // read ?create=true from query string and convert to boolean
  const create =
    typeof req.query.create !== "undefined" && req.query.create === "true";
  // render the 'about' view (no leading slash)
  res.render("about", { title: "About", links: links, create: create });
});

module.exports = aboutRouter;
