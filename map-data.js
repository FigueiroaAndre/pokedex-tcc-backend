const fs = require('fs');
const config = require('./config.json');

const pokemonFullDataList = fs.readFileSync('./data/' + config.map.inputFilename);
const parsedPokemonFullDataList = JSON.parse(pokemonFullDataList);

const mappedPokemonDataList = parsedPokemonFullDataList
    .filter(pkm => pkm.is_default)
    .map(fullPokemonData => {
        console.log(`Proccessing ${fullPokemonData.name}`);

        return {
            id: fullPokemonData.id,
            name: fullPokemonData.name,
            sprite: fullPokemonData.sprites.front_default,
            types: fullPokemonData.types.map(t => t.type)
        }
    });

fs.writeFileSync('./data/' + config.map.outputFilename, JSON.stringify(mappedPokemonDataList));