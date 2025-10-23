const { Router } = require("express");
const indexRouter = Router();
//for redirect with variables
const url = require("url");

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
    snippet: "Lorem ipsum 1...",
    message: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
    snippet: "Lorem ipsum 2..",
    message: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  },
];
/*
function sendPostRequest() {
  console.log("at sendPostRequest");
  fetch("/details", {
    method: "POST",
    headers: {
      "Content-Type": "aplication/json",
    },
    body: JSON.stringify({ id: "id" }),
  })
    .then((response) => response.json())
    .then((data) => console.log("data: ", data))
    .catch((error) => {
      console.error("Error: ", error);
    });
}
    */

//display messages
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

//add create new message functionality
indexRouter.get("/new", (req, res) => {
  res.redirect(
    url.format({
      pathname: "/",
      query: { title: "Home-new", create: true },
    })
  );
});

//POST the new message
indexRouter.post("/new", (req, res) => {
  console.log("req.body: ", req.body);

  const create =
    typeof req.query.create !== "undefined" && req.query.create === "false";

  const msg = {};

  msg.title = req.body.title;
  msg.user = req.body.user;
  msg.snippet = req.body.snippet;
  msg.body = req.body.body;

  messages.push({
    text: msg.title,
    user: msg.user,
    added: new Date(),
    snippet: msg.snippet,
    message: msg.body,
  });
  /*
  res.render("index", {
    title: "Home",
    links: links,
    messages: messages,
    create: create,
  });
  */
  //res.redirect("/", { messages: messages, create: create });
  res.redirect("/");
});

// export the router directly so app.use receives the Router instance
module.exports = indexRouter;
