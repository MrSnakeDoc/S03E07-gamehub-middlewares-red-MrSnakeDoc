const express = require("express");
const router = express.Router();
const games = require("../games.json");
const chooseView = require("./middleware/js/chooseView");
const middleware = require("./middleware/js/middleware");
module.exports = router;
router.use(express.static("./src/public"));

router.use("/favicon.ico", (req, res) => {
  res.status(204);
  res.end();
});
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()} ${req.ip}] ${req.originalUrl}`);
  next();
});
router.get("/", (req, res) => {
  req.app.locals.game = {};
  res.render("index");
});
router.get("/game/:nomDuJeu", (req, res) => {
  let view = chooseView.choose(req.params.nomDuJeu, games);
  view
    ? (req.app.locals.game = {
        name: view.name,
        title: view.title,
        cssFile: view.cssFile,
        jsFile: view.jsFile,
      })
    : (req.app.locals.game = {
        name: "404",
        title: "Erreur 404",
        cssFile: "404.css",
      });
  res.render(req.app.locals.game.name);
});

router.get("/search", (req, res) => {
  let view = chooseView.choose(req.path.substr(1), games);
  req.app.locals.game = {
    name: view.name,
    title: view.title,
    cssFile: view.cssFile,
    jsFile: view.jsFile,
  };
  res.render(view.name);
});

router.get("/search/results", (req, res) => {
  let view = chooseView.search(req.query.search, games);
  req.app.locals.results = {
    name: "results",
    cssFile: "results.css",
  };
  view
    ? (req.app.locals.game = {
        name: view.name,
        title: view.title,
      })
    : (req.app.locals.game = "undefined");

  res.render("results");
});

router.use((req, res, next) => {
  middleware.nothingHere(req.app.locals);
  res.render(req.app.locals.game.name);
  next();
});
