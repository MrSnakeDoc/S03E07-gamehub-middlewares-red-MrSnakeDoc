const views = {
  choose(url, games) {
    return games.find((obj) => {
      return obj.name === url;
    });
  },
  search(title, games) {
    return games.find((obj) => {
      return obj.title === title || obj.name === title || obj.alias === title;
    });
  },
};

module.exports = views;
