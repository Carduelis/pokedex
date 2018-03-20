export const POKEMON_GITHUB_IMAGE_URL =
	'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
export const API_URL = 'https://pokeapi.co/api/v1/';
export const BACKEND_ROOT = 'http://127.0.0.1/junction/public/';
export const HARD_CACHE_IS_ON = `
	======================
	|  HARD CACHE IS ON  |
	======================
	`;

export const NO_FILTERING_ERROR = `
	=======================================================
	|  NO LOADING, CAUSE API DOES NOT PROVIDE FILTERING.  |
	|  PRELOAD AND CACHE ALL POKEMONS VIA CHUNK-LOADING.  |
	=======================================================
`;

export const getPokemonURL = ({ limit, offset }) =>
	`${API_URL}pokemon/?limit=${limit}&offset=${offset}`;

export const getTypeURL = ({ limit, offset }) =>
	`${API_URL}type/?limit=${limit}&offset=${offset}`;
