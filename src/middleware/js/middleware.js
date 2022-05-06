const middleware = {
  nothingHere(locals) {
    locals.game = {
      name: "404",
      title: "Error 404",
      cssFile: "404.css",
    };
  },
};
module.exports = middleware;
