import React, { Component } from 'react';
import { Consumer } from '../Context';


class Header extends Component{

	render(){

		return(

			<Consumer>
				{context => {
					return(
						<header className="header app__row">
							<div className="app__column">
								<a href="https://ricodesantis.com"><img className="header__logo" alt="RD Development Logo" src="/public/images/RD-logo-grey-650-dark.png" /></a>
							</div>
							<div className="app__column">
								<h1 className="header__title">Email Marketing Spam Tool</h1>
							</div>
			          	</header>
					);
				}}
			</Consumer>
		);
	}
}

export default Header