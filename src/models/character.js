class Character {
  constructor(
    name,
    gender,
    hair_color,
    skin_color,
    eye_color,
    height,
    homeworld,
    species
  ) {
    this.name = name;
    this.gender = gender;
    this.hair_color = hair_color;
    this.skin_color = skin_color;
    this.eye_color = eye_color;
    this.height = height;
    this.homeworld = homeworld;
    this.species = species;
  }
}

module.exports = Character;
