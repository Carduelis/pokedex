import { types, getParent, destroy, detach } from 'mobx-state-tree';
import { ReportModel } from './ReportModel';
import { TicketGroupModel } from './TicketGroupModel';
import { state, ticketLifecycle } from './Types';

export const TicketModel = types
	.model('Ticket', {
		id: types.identifier(),
		index: types.number,
		order: types.maybe(types.number),
		title: types.string,
		state,
		linkedBy: types.maybe(types.reference(TicketGroupModel)),
		lifecycle: ticketLifecycle,
		reports: types.maybe(types.reference(ReportModel))
	})
	.views(self => ({
		get tickets() {
			return getParent(self);
		},
		get groups() {
			return self.ticketStore.groups;
		},
		get ticketStore() {
			return getParent(self.tickets);
		},
		getTicketByIndex(index) {
			return self.tickets.find(item => item.index === index);
		},
		get availableTicketsIndexes() {
			console.log(self.tickets);
			return self.tickets.map(ticket => ticket.index);
		},
		get lastReport() {
			if (self.reports) {
				return self.reports[self.reports.length - 1];
			} else {
				return null;
			}
		},
		get idLength() {
			return self.id.length;
		}
	}))
	.actions(self => {
		function rename(title) {
			self.title = title;
		}
		function afterCreate(...rest) {
			console.log('Ticket has been created', self);
			console.log(...rest);
		}
		function beforeDestroy(...rest) {
			console.log('Ticket has been destroyed', self);
			console.log(...rest);
		}
		function remove() {
			console.log(self.ticketStore);
			self.ticketStore.removeTicket(self);
		}
		function linkTo(ticketIndex) {
			if (self.linkedBy) {
				return alert('Сперва открепите карточку');
			} else {
				const targetTicket = self.ticketStore.getTicketByIndex(ticketIndex);
				const targetGroup = targetTicket.linkedBy;
				if (targetGroup) {
					// we need to find a group and add to it
					targetGroup.addTicket(self);

					self.linkGroup(targetGroup.id);
				} else {
					// we need to create new group and add both tickets to it
					const groupId = self.ticketStore.addGroup(self, targetTicket);

					// move to group-afterCreate
					targetTicket.linkGroup(groupId);
					self.linkGroup(groupId);
				}
			}
		}
		function linkGroup(groupId) {
			self.linkedBy = groupId;
		}
		function unlink() {
			console.log('length', self.linkedBy.tickets.length);
			if (self.linkedBy.tickets.length === 2) {
				// there are two tickets in group, we need destroy it
				self.ticketStore.removeGroup(self.linkedBy);
			} else {
				// let n = null;
				// self.linkedBy.tickets.forEach((ticket, i) => {
				// 	if (ticket.linkedBy.id === self.linkedBy.id) {
				// 		n = i;
				// 	}
				// });
				// self.linkedBy.tickets.splice(n, 1);
				self.linkedBy.removeTicket(self);
				self.linkedBy = null;
			}
		}
		return {
			rename,
			linkGroup,
			remove,
			linkTo,
			unlink,
			beforeDestroy,
			afterCreate
		};
	});
