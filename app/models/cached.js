import { getItem } from '../helpers/localStorage';
import breakableEach from '../helpers/each';

export default function(startIndex, endIndex) {
	let queryIsCached = true;
	const objects = [];
	const meta = getItem('meta', { async: false });
	if (meta) {
		console.log(startIndex, endIndex);
		breakableEach(startIndex, endIndex, index => {
			const cachedPokemon = getItem(`pokemon${index}`, { async: false });
			if (cachedPokemon) {
				objects.push(cachedPokemon);
			} else {
				queryIsCached = false;
				return false;
			}
		});
	} else {
		queryIsCached = false;
	}
	return queryIsCached && { meta, objects };
}
