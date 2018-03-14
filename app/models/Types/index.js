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

export { state, ticketLifecycle };

// export * from './state';
//
//
