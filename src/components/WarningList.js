import React, { PureComponent } from 'react';
// import GameCard from './GameCard';
import { Consumer } from '../Context';
import WarningItem from './WarningItem'


class WarningList extends PureComponent {
	componentDidMount = () => {

	}

	render(){

		return (
			<Consumer>
	    		{ context => (
	    			<div className="warning-list">
		    			<ul className="warning-list__list">
		    				{context.totalSpamTriggersDetected.length === 0 ? <li className="warning-list__empty-message">Test your content</li> : context.totalSpamTriggersDetected.map( (word, i) => <WarningItem key={ word } word={word}/> ) }
				        </ul>
					</div>
	    		)}
	    	</Consumer>
		);
	}
}


export default WarningList