const fs = require('fs');
const config = require('./config.json');

const pokemonName = process.argv[2] || '';

if (!pokemonName) {
    console.log('Please provide the name of pokemon as argument');
    return
}

const pokemonFullDataList = JSON.parse(fs.readFileSync('./data/' + config.map.inputFilename));

const pokemonData = pokemonFullDataList.find(pkm => pkm.name.toLowerCase() === pokemonName.toLowerCase());

if(!pokemonData) {
    console.log('Pokemon with name ' + pokemonName + ' not found.');
    return
}

console.log(pokemonData);