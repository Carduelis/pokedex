import { types } from 'mobx-state-tree';
import { TicketModel } from './TicketModel';
import { TicketGroupModel } from './TicketGroupModel';
import { uniqId } from '../helpers';

export const TicketStore = types
	.model('TicketStore', {
		tickets: types.array(TicketModel),
		groups: types.array(TicketGroupModel)
	})
	.views(self => ({
		get total() {
			return self.tickets.length;
		},
		get standaloneTickets() {
			return self.tickets.filter(ticket => !ticket.linkedBy);
		},
		getTicketByIndex(index) {
			return self.tickets.find(item => item.index === index);
		},
		get sortedTicketsAndGroups() {
			const concatenated = [...self.standaloneTickets, ...self.groups];
			return concatenated.sort(item => -item.index);
		},
		getTotal(key) {
			return self.tickets.filter(ticket => ticket.lifecycle === key).length;
		},
		get maxIndex() {
			return self.tickets.length === 0
				? 0
				: Math.max(...self.tickets.map(t => t.index));
		}
	}))
	.actions(self => {
		function addTicket(title) {
			if (self.maxIndex === 10) {
				alert('Достигнут максимум');
				return false;
			}
			self.tickets.push({
				id: uniqId(),
				title,
				lifecycle: 'created',
				index: 1 + self.maxIndex
			});
		}
		function addGroup(ticketModel, ticketTargetModel) {
			const groupJSON = {
				id: uniqId(),
				tickets: [ticketModel.id, ticketTargetModel.id]
			};
			self.groups.push(groupJSON);
			return groupJSON.id;
		}
		function removeTicket(model) {
			self.tickets.remove(model);
		}
		function removeGroup(model) {
			self.groups.remove(model);
		}
		return {
			removeTicket,
			removeGroup,
			addGroup,
			addTicket
		};
	});
