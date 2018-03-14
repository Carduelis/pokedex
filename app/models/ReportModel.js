import { types, getParent, flow } from 'mobx-state-tree';

function ajax(model) {
	return model.toJSON();
}

export const ReportModel = types
	.model('Report', {
		id: types.identifier(),
		date: types.Date,
		name: types.string,
		state: types.enumeration('State', ['pending', 'done', 'error']),
		isRead: false,
		isSent: false,
		files: types.maybe(types.array(types.string)),
		comment: types.maybe(types.string)
	})
	.views(self => ({
		get ticket() {
			return getParent(self);
		}
	}))
	.actions(model => {
		const send = flow(function* sendReport() {
			model.state = 'pending';
			try {
				const response = yield ajax(model);
				model.state = 'done';
				model.isSent = true;
				console.log(response);
			} catch (e) {
				model.state = 'error';
				console.error(e);
			}
		});
		return { send };
	});
