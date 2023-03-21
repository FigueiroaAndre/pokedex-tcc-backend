const axios = require('axios');
const fs = require('fs');
const config = require('./config.json');


let response;

async function fetchPokemonData() {

    try {
        console.log('Attempt to get pokemon resources list of ' + config.loadData.amount + ' Pokemons');
        response = await axios.get('https://pokeapi.co/api/v2/pokemon/', {
        params: { limit: config.loadData.amount }
    });
    console.log('Successfully fetched pokemon resources list from PokeAPI')
    } catch (error) {
        console.error('Failed to GET list of pokemon resources list from PokeAPI');
        return
    }

    const pokemonResourcesList = response.data.results;
    const pokemonDataList = [];

    console.log('Attempt to get data of each pokemon in resources list');
    for (let pokemonResource of pokemonResourcesList) {
        try {
            response = await axios.get(pokemonResource.url);
            console.log('Successfully fetched data of ' + pokemonResource.name);
            pokemonDataList.push(response.data);
        } catch (error) {
            console.error('Failed to GET data of ' + pokemonResource.name);
            return
        }
    }
    console.log('Successfully retrieved data from ' + pokemonDataList.length + ' Pokemons');

    fs.writeFileSync('./data/' + config.loadData.filename, JSON.stringify(pokemonDataList));
}

fetchPokemonData();


