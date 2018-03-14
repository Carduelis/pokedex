import React from 'react';
import ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { Provider } from 'mobx-react';
import { MainStore } from './models/MainStore';
import './styles/style.less';
import App from './containers/App';

const fetcher = url => window.fetch(url).then(response => response.json());
const store = MainStore.create(
	{},
	{
		fetch: fetcher,
		alert: m => console.log(m) // Noop for demo: window.alert(m)
	}
);

window.store = store;

const history = {
	snapshots: observable.shallowArray(),
	actions: observable.shallowArray(),
	patches: observable.shallowArray()
};
// import './index.ejs';

// import Root from './containers/Root';
const rootElement = document.getElementById('root');
ReactDOM.render(
	<Provider store={store} history={history}>
		<App />
	</Provider>,
	rootElement
);
