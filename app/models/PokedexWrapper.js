const Pokedex = require('pokeapi-js-wrapper');
const options = {
	protocol: 'https',
	// hostName: 'localhost:443',
	versionPath: '/api/v2/',
	cache: true,
	timeout: 5 * 1000 // 5s
};
const P = new Pokedex.Pokedex(options);
let interval = {
	limit: 20,
	offset: 0
};
P.getPokedexsList().then(response => {
	console.log(response);
});
P.getPokemonsList(interval).then(response => {
	console.log(response);
});
P.getPokedexByName('kanto').then(response => {
	console.log(response);
});
