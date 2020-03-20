const mongoose = require('mongoose');

const showIndexPage = (request, response, err) => {
  return response.json({ name: 'George David' , age: 21 });
};

module.exports = {
  showIndexPage,
};
