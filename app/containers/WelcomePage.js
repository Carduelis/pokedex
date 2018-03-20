import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
// import { observable } from 'mobx';
// import { connect } from 'react-redux';
import MdArrowForward from 'react-icons/lib/md/arrow-forward';
// import { GOOGLE_API_KEY, BACKEND_ROOT } from '../constants';
// import Loader from '../components/Loader';
// import Input from '../components/Input';
import { Button } from '../components/UI';
// import { User } from '../models';

@inject('store')
@observer
class WelcomePage extends Component {
	componentDidMount() {}
	render() {
		console.log(this.props);
		// const user = User.create();
		// console.log(user.toJSON());
		return (
			<div className="welcome-page">
				<div className="text-block text-block-disclaimer">
					<h2>Disclaimer</h2>
					<div className="text-block-content">
						<h3>Why Mobx instead of Redux?</h3>
						<p>
							There is no need to write a lot of boilerplate code for
							actions/reducers/etc. unlike redux.
						</p>
						<p>Mobx ideally fits for a small self-maintained apps like this.</p>
						<p>
							I am looking forward to try and implement new libraries and
							frameworks.
						</p>
						<h3>Why not "eslint standard config"?</h3>
						<p>
							I am used to write code in a familiar environment so I choosed
							custom eslint-config that I maintain by my own.
							<br />
							And, of course, for me there is no problem swaping into "eslint
							standard config".
						</p>
					</div>
				</div>
				<div className="text-block text-block-attention">
					<h2>What should I draw your attention to?</h2>
					<div className="text-block-content">
						<h3>Design</h3>
						<p>Awesome animations and way of visualisation of image loading</p>
						<p>Custom self-developed css-gradients</p>
						<h3>Code</h3>
						<p>Caching and more</p>
						<p>Caching and more</p>
						<p>Caching and more</p>
					</div>
				</div>
				<Button handleClick={() => (window.location.hash = '#/pokemons')}>
					<span className="arrow">
						<MdArrowForward />
					</span>
				</Button>
			</div>
		);
	}
}

export default WelcomePage;
