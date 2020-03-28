let getDataInfra = require("../infrastructure/api/swapi");
let { Movie, Planet, Character, Starship, Specie } = require("../models");

/**
 * Método prinicipal de la capa de servicios, es quien primero
 * consume el api Swapi y pasa los datos a
 * create_format_movies para que el se encargue de la estructura
 * y datos restantes
 */
let getAllMovies = async () => {
  return await new Promise(async (resolve, reject) => {
    let response_swapi = getDataInfra.get_all_movies();
    response_swapi
      .then(function(response) {
        return response.json();
      })
      .then(async function(data) {
        let listMovies = await create_format_movies(data);
        resolve(listMovies);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

/**
 * Se encarga de dar el formato esperado a los datos obtenidos por el API
 * Inicia un ciclo for de todos los listados que recupero del api
 * Llama a una funcion que se encarga de colectar los planetas en un array
 * de igual forma se procede con actores y nave
 * @param {*} data
 */
async function create_format_movies(data) {
  const movies = [];
  for (result of data.results) {
    let movie = new Movie();
    movie.title = result.title;
    movie.planets = await collect_planets(result.planets);
    movie.characters = await collect_characters(result.characters);
    movie.starships = await collet_starships(result.starships);
    movies.push(movie);
  }
  return movies;
}

/**
 * toma la o las uri en sus parámetros y empieza a gestionar
 * todos los planetas que tiene registrados
 * @param {*} path_planets
 */
async function collect_planets(path_planets) {
  let list_planets = [];
  for (path_planet of path_planets) {
    let current_planet = getDataInfra.get_data(path_planet);
    let planetToStore = await resolve_planets(current_planet);
    list_planets.push(planetToStore);
  }
  return list_planets;
}

/**
 * se encarga de resolver la promesa que se generó en
 * collect_planets
 * @param {*} promise
 */
async function resolve_planets(promise) {
  return promise
    .then(function(response) {
      return response.json();
    })
    .then(async function(data) {
      let { name, terrain, gravity, diameter, population } = data;
      let new_planet = new Planet(name, terrain, gravity, diameter, population);
      return new_planet;
    });
}

/**
 * toma la o las uri en sus parámetros y empieza a gestionar
 * todos los actores que tiene registrados
 * @param {*} path_characters
 */
async function collect_characters(path_characters) {
  let list_characters = [];
  for (path_character of path_characters) {
    let current_character = getDataInfra.get_data(path_character);
    let characterToStore = await resolve_characters(current_character);
    list_characters.push(characterToStore);
  }
  return list_characters;
}

/**
 *  * se encarga de resolver la promesa que se generó en
 * collect_characters
 * @param {*} promise
 */
async function resolve_characters(promise) {
  return promise
    .then(function(response) {
      return response.json();
    })
    .then(async function(data) {
      let {
        name,
        gender,
        hair_color,
        skin_color,
        eye_color,
        height,
        homeworld,
        species
      } = data;
      let new_character = new Character(
        name,
        gender,
        hair_color,
        skin_color,
        eye_color,
        height,
        homeworld,
        species
      );
      new_character = await find_homeworld_characters(new_character);
      new_character.species = await find_specie_characters(
        new_character.species
      );
      return new_character;
    });
}

/**
 * * toma la o las uri en sus parámetros y empieza a gestionar
 * la nave registrada como la más grande
 * @param {*} path_starships
 */
async function collet_starships(path_starships) {
  for (path_starship of path_starships) {
    let current_starship = getDataInfra.get_data(path_starship);
    return current_starship
      .then(function(response) {
        return response.json();
      })
      .then(async function(data) {
        let { name, model, manufacturer, passengers } = data;
        let new_startship = new Starship(name, model, manufacturer, passengers);
        return new_startship;
      });
  }
}

/**
 * Se encarga especificamente de buscar el planeta proveniete
 * del actor
 * @param {*} characters
 */
async function find_homeworld_characters(characters) {
  let path_homeworld = characters.homeworld;
  let path = [];
  path.push(path_homeworld);
  let planet = await collect_planets(path);
  characters.homeworld = planet[0].name;
  return characters;
}

/**
 * Se encarga especificamente de buscar la especie
 * del actor
 * @param {*} path_species
 */
async function find_specie_characters(path_species) {
  for (let path_specie of path_species) {
    let current_specie = getDataInfra.get_data(path_specie);
    return current_specie
      .then(function(response) {
        return response.json();
      })
      .then(async function(data) {
        let { name, language, average_height } = data;
        let new_specie = new Specie(name, language, average_height);
        return new_specie;
      });
  }
}

module.exports = getAllMovies;
