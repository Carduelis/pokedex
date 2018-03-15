import { types } from 'mobx-state-tree';

const state = types.maybe(
	types.enumeration('State', ['pending', 'done', 'error'])
);
const ticketLifecycle = types.enumeration('TicketLifecycle', [
	'created',
	'underway',
	'done',
	'cancelled',
	'rejected'
]);

const pokemonPlainTypes = {
	pkdx_id: types.identifier(types.number),
	name: types.string,
	attack: types.number,
	defense: types.number,
	exp: types.number,
	happiness: types.number,
	hp: types.number,
	speed: types.number,
	height: types.string,
	sprites: types.array(types.frozen),
	weight: types.string
};
export { state, ticketLifecycle, pokemonPlainTypes };

// export * from './state';
//
//
