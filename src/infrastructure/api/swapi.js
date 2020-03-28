const get_all_movies_path = require("../../config").SWAPI_ALL_MOVIES;
const fetch = require("node-fetch");

/**
 * Método inicial con URI o path definido para inciar el proceso
 * de captura de todas las peliculas
 */
async function get_all_movies() {
  return await fetch(get_all_movies_path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ a: 1, b: 2 }),
    cache: "no-cache"
  });
}

/**
 * funcionalidad que se encarga de hacer peticiones http.
 * la URL es enviada por la capa de servicios para gestionar
 * el api Swapi
 * @param {*} uri_path
 */
async function get_data(uri_path) {
  return await fetch(uri_path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    cache: "no-cache"
  });
}

module.exports = { get_all_movies, get_data };
