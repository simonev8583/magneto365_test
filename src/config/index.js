if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  SWAPI_ALL_MOVIES: process.env.SWAPI_ALL_MOVIES
};
