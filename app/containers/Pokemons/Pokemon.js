import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class Pokemon extends Component {
	render() {
		return <div className="pokemon">poke</div>;
	}
}

export { Pokemon };
