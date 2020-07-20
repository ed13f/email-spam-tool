import React, { PureComponent } from 'react';
import axios from "axios"


class WarningItem extends PureComponent {

	state = {
		synonyms: [],
		showSynonyms:false,
		word: this.props.word
	}

	toggleSnyonyms = () =>{
		let toggleOption = false
		if(this.state.showSynonyms){
			toggleOption = false
		} else {
			toggleOption = true
		}
		this.setState(prevState => ({ showSynonyms: toggleOption }))
	}

	stripUrlSlug = (inputWord) =>{
		let inputString = inputWord
		let protectedSymbols = ["#","$","%"]
		protectedSymbols.forEach((word, index) => {
			if(inputString.includes(word)){inputString = "rico"}
		})
		return inputString
	}

	componentDidMount() {
	    axios.get(`https://api.dictionaryapi.dev/api/v1/entries/en/${this.state.word}`)
	      .then(res => {
	        const persons = res.data;
	        if(persons && persons !== null && persons !== false){ 
	        	let meaning = persons[0]["meaning"]
		        let synonyms = []
		        if(meaning["adjective"]){
		        	synonyms = meaning["adjective"][0]["synonyms"]
		        } else if(meaning["verb"]){
		        	synonyms = meaning["verb"][0]["synonyms"]
		        } else if(meaning["noun"]){
		        	synonyms = meaning["noun"][0]["synonyms"]
		        } else if(meaning["transitive verb"]){
		        	synonyms = meaning["transitive verb"][0]["synonyms"]
		        } else if(meaning["cardinal number"]){
		        	synonyms = meaning["cardinal number"][0]["synonyms"]
		        }
		        synonyms = synonyms.slice(0,10)
		        this.setState( prevState => {
			      return {
			        synonyms: synonyms
			      }
			    })
		    }
	    })
        .catch(error => {})
	}

	render(){

		return (
			<li className={"warning-item" + (this.state.showSynonyms ? ' active' : '')}>
			{/*<li key={ this.state.synonyms ? this.state.synonyms.slice(-1)[0] + 1 : 0 } className={"warning-item" + (this.state.showSynonyms ? ' active' : '')}>*/}
				{ this.state.word }
				{ this.state.synonyms !== null && this.state.synonyms.length !== 0 ? <button onClick={this.toggleSnyonyms} className="warning-item__synonyms-button" href="#"><i className="fa fa-angle-down warning-item__icon"></i></button> : null }
				<ul className="warning-item__list">
					<li className="warning-item__title">Synonyms:</li>
					{this.state.synonyms !== null && this.state.synonyms.length !== 0 ? this.state.synonyms.map( (word, i) => <li key={i} className="warning-item__item">{word}</li> ): null}
		        </ul>
			</li>		        
		)
	}
}

export default WarningItem