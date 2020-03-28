let controller = require("../src/controller");

/**
 * Inicio de la aplicación
 */
controller.getAllMovies().then(movies => {
  console.log(JSON.stringify(movies));
});
