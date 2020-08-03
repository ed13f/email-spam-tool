import React, { Component } from 'react';
import latinize from 'latinize'
import { Consumer } from '../Context';
import Highlighter from './Highlighter/Highlighter'


class TestForm extends Component{

	handleSubjectScroll() {
		let subjectInput = document.getElementById("subject-input")
		let subjectInputX = subjectInput.scrollLeft
		document.getElementById("subject-screen").scrollLeft = subjectInputX
	}
	handleContentScroll() {
		let contentInput = document.getElementById("content-input")
		let contentInputY = contentInput.scrollTop
		document.getElementById("content-screen").scrollTop = contentInputY
	}
	handleCtaScroll() {
		let subjectInput = document.getElementById("cta-input")
		let subjectInputX = subjectInput.scrollLeft
		document.getElementById("cta-screen").scrollLeft = subjectInputX
	}

	onChangeContent = (e) => {
		e.preventDefault();
		let data = e.target.value
		this.props.handleContentTest(data)
	}

	onChangeSubjectLine = (e) => {
		e.preventDefault();
		let data = e.target.value
		this.props.handleSubjectTest(data)
	}
	onChangeCta = (e) => {
		e.preventDefault();
		let data = e.target.value
		this.props.handleCtaTest(data)
	}

	render(){

		return(

			<Consumer>
				{context => {
					return(
						<form className="form" onSubmit={this.handleSubmit}>
							<div className="form__row">
								<div className="form__highlighter-wrapper">
									<Highlighter
							          activeClassName="highlighter__active"
							          activeIndex={-1}
							          caseSensitive={false}
							          className="form__highlight-screen form__highlight-screen--text"
							          highlightClassName="highlighter__highlight"
							          highlightStyle={{ fontWeight: 'normal' }}
							          sanitize={latinize}
							          searchWords={this.props.totalSpamTriggersDetected}
							          textToHighlight={this.props.subject}
							          id="subject-screen"
							        />
							    </div> 
								<div className="form__column">
									<label className="form__label h2" htmlFor="subjectLine">Subject Line</label>
									<input 
										type="text"
										className="form__input"
										placeholder="Enter your subject here..."
										value={this.context.subjectLine}
										onChange={this.onChangeSubjectLine}
										name="subjectLine"
										autoComplete="off"
										maxLength="35"
										onScroll={this.handleSubjectScroll}
										id="subject-input"
									/>
								</div>
							</div>
							<div className="form__row">
								<div className="form__highlighter-wrapper">
									<Highlighter
							          activeClassName="highlighter__active"
							          activeIndex={-1}
							          caseSensitive={false}
							          className="form__highlight-screen form__highlight-screen--textarea"
							          highlightClassName="highlighter__highlight"
							          highlightStyle={{ fontWeight: 'normal' }}
							          sanitize={latinize}
							          searchWords={this.props.totalSpamTriggersDetected}
							          textToHighlight={this.props.content}
							          id="content-screen"
							        />
						        </div> 
								<div className="form__column">
									<label className="form__label h2" htmlFor="content">Body Content</label>
									<textarea
										rows="10"
										className="form__input form__input--textarea"
										placeholder="Enter you content here..."
										value={this.context.content}
										onChange={this.onChangeContent}
										name="content"
										autoComplete="off"
										maxLength="500"
										onScroll={this.handleContentScroll}
										id="content-input"
									/>
								</div>	
							</div>
							<div className="form__row">
							    <div className="form__highlighter-wrapper">
									<Highlighter
							          activeClassName="highlighter__active"
							          activeIndex={-1}
							          caseSensitive={false}
							          className="form__highlight-screen form__highlight-screen--text"
							          highlightClassName="highlighter__highlight"
							          highlightStyle={{ fontWeight: 'normal' }}
							          sanitize={latinize}
							          searchWords={this.props.totalSpamTriggersDetected}
							          textToHighlight={this.props.cta}
							          id="cta-screen"
							        />
							    </div> 
								<div className="form__column">
									<label className="form__label h2" htmlFor="subjectLine">CTA</label>
									<input 
										type="text"
										className="form__input"
										placeholder="Enter your CTA here..."
										value={this.context.cta}
										onChange={this.onChangeCta}
										name="cta"
										autoComplete="off"
										maxLength="35"
										onScroll={this.handleCtaScroll}
										id="cta-input"
									/>
								</div>
							</div>
						</form>
					)
				}}
			</Consumer>
		)
	}
}

export default TestForm