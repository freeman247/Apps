import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import './bootstrap.min.css';


function Hero() {
  return (<div className="row">
    <div className="jumbotron col-10 offset-1">
      <h1>Quiz</h1>
      <p>Select the book written by the author shown</p>
    </div>
  </div>)
}

function Book({title, onClick}) {
  return(<div className="answer" onClick={() => {onClick(title);}}>
    <h4>{title}</h4>
  </div>)
}

function Turn({author, books, highlight, onAnswerSelected}) {
  function highlightToBgColor(highlight) {
    const mapping = {
      'none': '',
      'correct': 'green',
      'wrong': 'red'
    };
    
    return mapping[highlight];
  }

  return (<div className="row turn" style={{ backgroundColor: highlightToBgColor(highlight)}}>
    <div className="col-4 offset-1">
      <img src={author.imageUrl} className="authorimage" alt="Author" />
    </div>
    <div className="col-6">
      {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected} />)}
    </div>
  </div>);
}

Turn.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  highlight: PropTypes.string.isRequired
};

function Continue({ show, onContinue }) {
  return (
    <div className="row continue">
    { show
      ? <div className="col-11">
          <button className="btn btn-primary btn-lg float-right">Continue</button>
        </div>
      : null }
    </div>
  );
}

function Footer() {
  return (<div id="footer" className="row">
    <div className="col-12">
      <p className="text-muted credit">All images are from <a href="http://commons.wikimedia.org/wiki/Main_page">Wikimedia Commons</a> and are in the public Domain</p>
    </div>
  </div>)
}

function mapStateToProps(state) {
  return {
    turnData: state.turnData,
    highlight: state.highlight
  };
}

function mapDispatchToProps(dispatch) {
  return{
    onAnswerSelected: (answer) => {
      dispatch({type: 'ANSWER_SELECTED', answer});
    },
    onContinue: () => {
      dispatch({type: 'CONTINUE'});
    }
  };
}

const Quiz = connect(mapStateToProps, mapDispatchToProps) (
  function({turnData, highlight, onAnswerSelected, onContinue}) {
    return (
      <div className="container-fluid">
        <Hero />
        <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
        <Continue show={highlight === 'correct'} onContinue={onContinue}/>
        <p><Link to="/add">Add an Author</Link></p>
        <Footer />
      </div>
    );
  }
);

export default Quiz;