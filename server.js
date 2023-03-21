const express = require('express');
const config = require('./config.json');
const cors = require('cors');
const fs = require('fs');

const app = express();
const data = JSON.parse(fs.readFileSync('./data/' + config.server.dataFilename));

const PAGE_SIZE = 20;

app.use(cors())

app.get('/pokemon', (request, response) => {
    const searchText = request.query.searchText || '';
    const page = request.query.page || 0;

    const searchResults = data.filter(pkm => pkm.name.toLowerCase().includes(searchText.toLowerCase()));

    response.json({
        last: PAGE_SIZE * page + PAGE_SIZE >= searchResults.length,
        content: searchResults.slice(PAGE_SIZE * page, PAGE_SIZE * page + PAGE_SIZE)
    });
});

app.listen(3000, () => {
    console.log('Servidor está rodando na porta 3000');
    console.log('Servidor possui base de dados de ' + data.length + ' pokemons.');
});