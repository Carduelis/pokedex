import { types, getParent } from 'mobx-state-tree';
import { TicketModel } from './TicketModel';

console.log(TicketModel);
export const TicketGroupModel = types
	.model('TicketGroup', {
		id: types.identifier(),
		tickets: types.array(types.reference(types.late(() => TicketModel)))
	})
	.views(self => ({
		get ticketStore() {
			return getParent(self);
		},
		get index() {
			return Math.min(...self.tickets.map(item => item.index));
		}
	}))
	.actions(self => {
		function afterCreate(...rest) {
			console.log('TicketGroup has been created', self);
			console.log(...rest);
		}
		function beforeDestroy(...rest) {
			console.log(`Group #${self.index}. Removing links from grouped tickets`);
			self.tickets.forEach(ticket => {
				ticket.linkedBy = null;
			});
			console.log('TicketGroup has been destroyed', self);
			console.log(...rest);
		}
		function addTicket(ticketModel) {
			self.tickets.push(ticketModel.id);
		}
		function removeTicket(ticketModel) {
			self.tickets.forEach((ticket, i) => {
				if (ticket.id === ticketModel.id) {
					self.tickets.splice(i, 1);
				}
			});
		}
		return {
			addTicket,
			removeTicket,
			beforeDestroy,
			afterCreate
		};
	});
