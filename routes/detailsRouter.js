const { Router } = require("express");
const detailsRouter = Router();
const bodyParser = require("body-parser");
//---------------------------
//for redirect with variables
const url = require("url");
//---------------------------

//data
const links = [
  { href: "/", text: "Home" },
  { href: "about", text: "About" },
  { href: "new", text: "Create new message" },
];
//---------------------------------------------------------------------------------------
// When use detailsRouter is mounted at '/details' in app.js, use the root path here

detailsRouter.get("/", (req, res) => {
  //console.log("req.body: ", req.body);
  console.log("req.query: ", req.query);
  // render the 'details' view (no leading slash)
  // res.render("details", { title: "Details", links: links });

  const title = req.query.title;
  const id = req.query.id;
  // Handle message object properties directly from query
  const message = req.query.message || "";

  console.log("title, id, message: ", title, id, message);
  /*
  res.render("details", {
    title: title,
    links: links,
    id: id,
    message: message,
  });
  */
  res.render("details", {
    title: req.query.title || "Message Details",
    links: links,
    text: req.query.text,
    message: req.query.message,
    user: req.query.user,
    added: req.query.added,
    snippet: req.query.snippet,
  });
});

// When use detailsRouter is mounted at '/details' in app.js, use the root path here
detailsRouter.post("/", (req, res) => {
  console.log("POST body:", req.body);

  // Access individual fields from form data
  res.redirect(
    url.format({
      pathname: "/details",
      query: {
        title: "Message Details",
        text: req.body.text,
        message: req.body.message,
        user: req.body.user,
        added: req.body.added,
        snippet: req.body.snippet,
      },
    })
  );
});

module.exports = detailsRouter;
