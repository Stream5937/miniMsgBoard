const { Router } = require("express");

const indexRouter = Router();

//data
const links = [
  { href: "/", text: "Home" },
  { href: "/about", text: "About" },
  { href: "/new", text: "Create new message" },
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

indexRouter.get("/", (req, res) => {
  // read ?create=true from query string and convert to boolean
  const create =
    typeof req.query.create !== "undefined" && req.query.create === "true";

  res.render("index", {
    title: "Home",
    links: links,
    messages: messages,
    create: create,
  });
});

indexRouter.post("/new", (req, res) => {
  console.log("req.body: ", req.body);

  const create =
    typeof req.query.create !== "undefined" && req.query.create === "false";

  const msg = {};

  msg.title = req.body.title;
  msg.user = req.body.user;
  msg.snippet = req.body.snippet;
  msg.body = req.body.body;

  messages.push({ text: msg.title, user: msg.user, added: new Date() });

  res.render("index", {
    title: "Home",
    links: links,
    messages: messages,
    create: create,
  });
});

// export the router directly so app.use receives the Router instance
module.exports = indexRouter;
