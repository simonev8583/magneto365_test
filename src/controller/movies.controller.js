let moviesService = require("../service/movies.service");

/**
 * controlador de movies o peliculas
 */

/**
 * Se encarga de gestionar todas las peliculas,
 * Es donde inicia la petición una vez el cliente hace la petición.
 */
async function getAllMovies() {
  try {
    var listMovies = await moviesService();
    return listMovies;
  } catch (error) {
    return "error", error;
  }
}

module.exports = getAllMovies;
