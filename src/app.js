let pokeName = document.getElementById('pokemon-name');
let pokeID = document.getElementById('pokemon-id');
let pokeType = document.getElementById('pokemon-type');
let pokeLocation = document.getElementById('pokemon-location');
let pokePic = document.getElementById('pokemon-pic');
let pokeShiny = document.getElementById('pokemon-shiny');


async function searchPokemon(input) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
    const data = await response.json();
    document.getElementById("output").innerHTML;
    pokeName.textContent = data.name.toUpperCase();
    pokeType.textContent = data.types[0].type.name.toUpperCase();
    pokeLocation.textContent = data.location_area_encounters.toUpperCase();
    pokeID.textContent = data.id;
  }
  

  async function searchRandomPokemon() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 649) + 1}`);
    const data = await response.json();
    pokeName.textContent = data.name.toUpperCase();
    pokeType.textContent = data.types[0].type.name.toUpperCase();
    pokeLocation.textContent = data.location_area_encounters.toUpperCase();
    pokeID.textContent = data.id;
    return data;
  }
