
let pokeName = document.getElementById('pokemon-name');
let pokeID = document.getElementById('pokemon-id');
let pokeType = document.getElementById('pokemon-type');
let pokeLocation = document.getElementById('pokemon-location');
let pokePic = document.getElementById('pokemon-pic');
let pokeShiny = document.getElementById('pokemon-shiny');
let pokeMoves = document.querySelector('.poke-move-list')
let pokeAbilities = document.querySelector('.poke-abilities-list') ;
let pokeEvo = document.querySelector('.poke-evo-line')
let regularSpriteUrl;
let shinySpriteUrl;
let evolutionLine;

let randomButton = document.getElementById('random-button');
let movesOn = document.querySelector('#moves-on');
let movesOff = document.querySelector('#moves-off');



// function for desired pokemon input
async function searchPokemon(input) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
  const data = await response.json();
  getPokemonSprites(data.id);
  getPokemonEvolutionChain(data.id);
  pokeName.textContent = data.name.toUpperCase();
  pokeType.textContent = data.types[0].type.name.toUpperCase();
  pokeLocation.textContent = data.location_area_encounters;
  pokeID.textContent = data.id;
  pokeEvo.textContent = evolutionLine;
  let specMoves = data.moves.map(move => move.move.name);
  pokeMoves.textContent = specMoves.join(', ').toUpperCase();
  let specAbilities = data.abilities.map(ability => ability.ability.name);
  pokeAbilities.textContent = specAbilities.join(', ').toUpperCase();

  console.log('Pokemon: ' + data.name.toUpperCase());
  console.log('ID: ' + data.id);
  console.log('-----');
}

// fucntion for random pokemon button
async function searchRandomPokemon() {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 649) + 1}`);
  const data = await response.json();
  getPokemonSprites(data.id);
  getPokemonEvolutionChain(data.id);
  pokeName.textContent = data.name.toUpperCase();
  pokeType.textContent = data.types[0].type.name.toUpperCase();
  pokeID.textContent = data.id;
  pokeLocation.textContent = data.location_area_encounters;
  let specMoves = data.moves.map(move => move.move.name);
  pokeMoves.textContent = specMoves.join(', ').toUpperCase();
  let specAbilities = data.abilities.map(ability => ability.ability.name);
  pokeAbilities.textContent = specAbilities.join(', ').toUpperCase();
  
  console.log('Pokemon: ' + data.name.toUpperCase());
  console.log('ID: ' + data.id);
  console.log('-----');
}

// fucntion for desired sprites, replacing desired sprites
async function getPokemonSprites(input) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
  const data = await response.json();
  const spriteId = data.id;
  const regularSpriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${spriteId}.png`;
  const shinySpriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${spriteId}.png`;
  pokePic = document.getElementById('pokemon-pic').src = regularSpriteUrl;
  pokeShiny = document.getElementById('pokemon-shiny').src = shinySpriteUrl;
}
// Function to get desired evolution chain, ouputting evolution chain
async function getPokemonEvolutionChain(input) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
  const data = await response.json();
  
  const evolutionChainResponse = await fetch(data.species.url);
  const evolutionChain = await evolutionChainResponse.json();
  
  const evolutionChainUrl = evolutionChain.evolution_chain.url;
  const evolutionDetailsResponse = await fetch(evolutionChainUrl);
  const evolutionDetails = await evolutionDetailsResponse.json();
  
  function getEvolutionLine(evolutionDetails) {
    let evolutionLine = [];
    let currentPokemon = evolutionDetails.chain;
    while (currentPokemon) {
      evolutionLine.push(currentPokemon.species.name);
      currentPokemon = currentPokemon.evolves_to[0];
    }
    return evolutionLine;
  }
  const evolutionLine = getEvolutionLine(evolutionDetails);
  pokeEvo.textContent = evolutionLine.join(' => ').toUpperCase();
}
// moves box event listenter to open and close boxes
movesOn.addEventListener('click', function () {
  movesOff.classList.remove('hiding')
  movesOn.classList.add('hiding');
  pokeMoves.classList.remove('hiding');
})
movesOff.addEventListener('click', function () {
  movesOn.classList.remove('hiding')
  movesOff.classList.add('hiding');
  pokeMoves.classList.add('hiding');
})




