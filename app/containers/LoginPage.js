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
class LoginPage extends Component {
	componentDidMount() {}
	render() {
		const { store } = this.props;
		const btnProps = {
			label: 'Continue',
			size: 'lg',
			styles: ['white'],
			handleClick: e => {
				console.log(e);
				const { bookStore } = store;
				bookStore.markLoading(!bookStore.isLoading);
			}
		};
		console.log(this.props);
		// const user = User.create();
		// console.log(user.toJSON());
		return (
			<div className="login-page">
				<div className="logo-wrapper">
					<div className="logo">
						<div className="logo-letter">DP</div>
					</div>
					<div className="logo-text">Dating picker!</div>
				</div>
				<div className="login-form">
					<div className="input-wrapper">
						<input
							ref={input => {
								this.textInput = input;
							}}
							className="input"
							type="text"
							defaultValue={this}
							placeholder="Your name"
						/>
						<span className="help-text">
							{store.bookStore.isLoading.toString()}
						</span>
					</div>
					<Button {...btnProps}>
						<span className="arrow">
							<MdArrowForward />
						</span>
					</Button>
				</div>
			</div>
		);
	}
}

export default LoginPage;
