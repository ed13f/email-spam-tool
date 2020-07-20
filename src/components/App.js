import React, { Component } from 'react'
import '../App.scss'
import { Provider } from '../Context';
import WarningList from './WarningList'
import TestForm from './TestForm'
import Header from './Header'


const isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
setTimeout(() => { alert("Copy/Paste the demo content in any input: 'Great deals with 100% transparency!! Take advantage of these cheap deals now before they expire!'") }, 1000)

class App extends Component {
  //state
  state = {
    content: '',
    subjectLine: '',
    cta: '',
    spamFilter:["#1", "100%", "Act now", "Action", "Additional income", "Affordable", "All natural", "All new", "Amazed", "Apply now", "Avoid", "Be amazed", "Be your own boss", "Beneficiary", "Billing", "Billion", "Bonus", "Boss", "Buy", "Call now", "Call free", "Cancel", "Cash", "Casino", "Certified", "Cheap", "Click here", "Clearance", "Collect", "Compare rates", "Congratulations", "Credit card", "Credit check", "Credit offers", "Cures", "Deal", "Dear friend", "Dear somebody", "Debt", "Discount", "Direct email", "Don't hesitate", "Don't delete", "Double your income", "Double your cash", "Earn", "Extra", "Expire", "Fantastic", "Free access", "Free money", "Free gift", "Freedom", "Friend", "Get it now", "Get it started", "Get it paid", "Great", "Guarantee", "Hello", "Income", "Increase sales", "Increase traffic", "Instant", "Investment", "Junk", "Limited", "Lose", "Lowest price", "Luxury", "Make money", "Medicine", "Money", "Name", "No credit check", "No experience", "Now", "Obligation", "Offer", "Only", "Open", "Order now", "Please", "Presently", "Problem", "Promise", "Purchase", "Quote", "Rates", "Refinance", "Refund", "Remove", "Request", "Risk-free", "Sales", "Satisfaction", "Save", "Score", "Serious", "Spam", "Success", "Supplies", "Take action", "Terms", "Traffic", "Trial", "Unlimited", "Urgent", "Weight", "While supplies last", "Win", "Winner"],
    spamTriggersDetected:[],
    totalSpamTriggersDetected:[],
    mobileShowList:false,
  }

  //Handle Content On Change
  handleContentTest = (inputs) => {
    let content = inputs
    let spamWords = this.state.totalSpamTriggersDetected;
    this.runSpamFilter(content, spamWords)
    this.setState( prevState => {
      return {
        content: content,
        totalSpamTriggersDetected: spamWords,
      }
    }, () => {
      this.updateAllInputForSpam()
    })
  }

  //Handle Subject On Change
  handleSubjectTest = (input) => {
    let subject = input
    let spamWords = this.state.totalSpamTriggersDetected
    this.runSpamFilter(subject, spamWords)
    this.setState( prevState => {
      return {
        subjectLine: subject,
        totalSpamTriggersDetected: spamWords,
      }
    }, () => {
      this.updateAllInputForSpam()
    })
  }

  //Handle Subject On Change
  handleCtaTest = (input) => {
    let cta = input
    let spamWords = this.state.totalSpamTriggersDetected
    this.runSpamFilter(cta, spamWords)
    this.setState( prevState => {
      return {
        cta: cta,
        totalSpamTriggersDetected: spamWords,
      }
    }, () => {
      this.updateAllInputForSpam()
    })
  }

  //Handle Mobile Toggle
  handleMobileListToggle = () => {
    let showList = this.state.mobileShowList
    showList === true ? showList = false : showList = true
    this.setState( prevState => {
      return {
        mobileShowList: showList
      }
    });

  }

  runSpamFilter = (input, spamWords) => {
    let spamFilters = this.state.spamFilter
    this.checkRemovedWords(spamWords, input)
    spamFilters.forEach((word, index) => {
      let wordRegExp = new RegExp(word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i");
      if(wordRegExp.test(input)){
        let word = wordRegExp.exec(input)[0]
        if(!spamWords.includes(word)){ spamWords.push(word) }
      } else {
        let wordIndex = spamWords.indexOf(word)
        if(spamWords.includes(word)){ spamWords.splice(wordIndex, 1)  }
       }
    })
  }

  checkRemovedWords = (spamWords, input) => {
    let subject = this.state.subjectLine
    let content = this.state.content
    let cta = this.state.cta
    spamWords.forEach((word, index) => {
      if(!input.includes(word)  && !subject.includes(word) && !content.includes(word) && !cta.includes(word) ){ 
        spamWords.splice(index, 1) 
      }
    })
  }

  updateAllInputForSpam = () => {
    let totalSpamWords =[]
    let subjectSpamWords = this.checkSingleInputForSpam(this.state.subjectLine)
    totalSpamWords = totalSpamWords.concat(subjectSpamWords)
    let contentSpamWords = this.checkSingleInputForSpam(this.state.content)
    totalSpamWords = totalSpamWords.concat(contentSpamWords)
    let ctaSpamWords = this.checkSingleInputForSpam(this.state.cta)
    totalSpamWords = totalSpamWords.concat(ctaSpamWords)
    let uniqueNames = totalSpamWords.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
    this.setState( prevState => {
      return {
        totalSpamTriggersDetected:uniqueNames
      }
    });
  }

  checkSingleInputForSpam = (input) => {
    let spamWords =[]
    let spamFilters = this.state.spamFilter
    spamFilters.forEach((word, index) => {
      let wordRegExp = new RegExp(word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i");
      if(wordRegExp.test(input)){
        let word = wordRegExp.exec(input)[0]
        if(!spamWords.includes(word)){ spamWords.push(word) }
      } 
    })
    return spamWords
  }

  render() {

    return (

      <Provider value={{
        content: this.state.content,
        subjectLine: this.state.subjectLine,
        spamFilter:this.state.spamFilter,
        cta:this.state.cta,
        totalSpamTriggersDetected: this.state.totalSpamTriggersDetected
      }}>
        <div className={isSafari ? "app safari" : "app"}>
          <Header />
          <section className={"app__row app__dashboard" + (this.state.mobileShowList ? " app__dashboard--active" : "" ) }>
            <div className="app__column app__column--flex-2">
              <TestForm 
                handleContentTest={this.handleContentTest} 
                handleSubjectTest={this.handleSubjectTest} 
                handleCtaTest={this.handleCtaTest} 
                content={this.state.content} 
                subject={this.state.subjectLine} 
                cta={this.state.cta} 
                totalSpamTriggersDetected={this.state.totalSpamTriggersDetected}
              />
            </div>
            <div className="app__column app__column--flex-1 app__mobile-slider">
                <button className="app__toggle-slider" onClick={this.handleMobileListToggle}>{this.state.mobileShowList ? <span className="app__toggle-options"><i className="fa fa-angle-right app__toggle-icon"></i> Hide</span> : <span className="app__toggle-options"><i className="fa fa-angle-left app__toggle-icon"></i> List</span> }</button>
              <h2 className="h2">Known Spam Words</h2>
              <WarningList/>
            </div>
          </section>
        </div>
      </Provider>  
    );
  }
}

export default App;
