import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route /*withRouter*/ } from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';  
import './index.css';
import Quiz from './Quiz';
import AddAuthorForm from './AddAuthorForm';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';

const authors = [
{ name: 'Mark Twain',
  imageUrl: 'images/authors/Mark_Twain.jpg',
  imageSource: 'wikimedia Commons',
  books: ['The Adventures of Huckleberry Finn', 
          'Life on Missippipi', 
          'Roughing it']   
},

{ name: "Joseph Conrad",
  imageUrl: 'images/authors/JosephConrad.png',
  imageSource: 'wikimedia Commons',
  books: ['Heart of Darkness']   
},

{ name: 'J K Rowling',
  imageUrl: 'images/authors/JKRowling.jpg',
  imageSource: 'wikimedia Commons',
  imageAttribution: "Daniel Ogren",
  books: ['Harry Potter and The Sorcerers Stone']   
},

{ name: 'Stephen King',
  imageUrl: 'images/authors/StephenKing.png',
  imageSource: 'wikimedia Commons',
  imageAttribution: 'Pinguino',
  books: ['The Shining', 'IT']   
},

{ name: 'Robert Kiyosaki',
  imageUrl: 'images/authors/RobertKiyosaki.jpg',
  imageSource: 'wikimedia Commons',
  imageAttribution: 'Pinguino',
  books: ['Rich Dad Poor Dad', 
          'Guide On Investment', 
          'Midas Touch', 'Cash Flow Quadrant']   
},

{ name: 'Charles Dickens',
  imageUrl: 'images/authors/CharlesDickens.jpeg',
  imageSource: 'wikimedia Commons',
  books: ['David Copperfield', 'A Tale of Tow Cities']   
},

{ name: 'William Shakespeare',
  imageUrl: 'images/authors/WilliamShakespeare.jpg',
  imageSource: 'wikimedia Commons',
  books: ['Hamlet', 'Romeo and Juliet', 'Macbeth']   
},

{ name: 'Napoleon Hill',
  imageUrl: 'images/authors/NapoleonHill.jpg',
  imageSource: 'wikimedia Commons',
  books: ['Think and Grow Rich', 'The Law of Success']   
},

{ name: 'Donald J Trump',
  imageUrl: 'images/authors/DonaldJTrump.jpg',
  imageSource: 'wikimedia Commons',
  books: ['The Art of The Deal', 
          'Crippled America', 'Midas Touch']   
},

{ name: 'Chimamanda Ngozi Adichie',
  imageUrl: 'images/authors/ChimamandaNgoziAdichie.jpg',
  imageSource: 'wikimedia Commons',
  books: ['Pupple Hybiscus', 
          'Americana', 
          'Half of A Yellow Sun']   
},

{ name: 'Chinua Achebe',
  imageUrl: 'images/authors/ChinuaAchebe.jpg',
  imageSource: 'wikimedia Commons',
  books: ['There Was A Country', 'A Man of The People', 
          'Arrow of God']   
},

{ name: 'Wole Soyinka',
  imageUrl: 'images/authors/WoleSoyinka.jpg',
  imageSource: 'wikimedia Commons',
  books: ['The Man Died', 'Ake', 
          'You Must Set Forth At Dawn']   
}
];

function getTurnData(authors) {
     const allBooks= authors.reduce(function(p, c, i) {
          return p.concat(c.books);
     }, []);
     const fourRandomBooks= shuffle(allBooks).slice(0,4);
     const answer = sample(fourRandomBooks);

     return {
          books: fourRandomBooks,
          author: authors.find((author) => 
          author.books.some((title) =>
           title === answer))
     }
}

function reducer(state = {authors, turnData: getTurnData(authors), highlight: ''}, 
action) {
     switch(action.type) {
          case 'ANSWER_SELECTED':
               const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
               return Object.assign(
                    {}, 
                    state, {
                         highlight: isCorrect ? 'correct': 'wrong'
                    });
          case 'CONTINUE':
               return Object.assign({}, state, {
                  highlight: '',
                  turnData: getTurnData(state.authors)  
               });
          case 'ADD_AUTHOR':
               return Object.assign({}, state, {
               authors: state.authors.concat([action.author])
          }); 
          default: return state;
     }
}

let store = Redux.createStore(reducer);

ReactDOM.render(
     <BrowserRouter>
          <ReactRedux.Provider store={store}>     
               <React.Fragment>
                    <Route exact path ="/" component={Quiz} />
                    <Route path ="/add" component ={AddAuthorForm}/>
               </React.Fragment>
          </ReactRedux.Provider>
     </BrowserRouter>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();