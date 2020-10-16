import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
//import appReducer  from './reducers/appReducer'
import {BrowserRouter} from 'react-router-dom';
import userReducer  from './reducers/userReducer';
import movieReducer  from './reducers/movieReducer';
import subscriptionReducer  from './reducers/subscriptionReducer';

const reducer = combineReducers({
  users: userReducer,
  movies: movieReducer,
  subscriptions: subscriptionReducer
})


const appStore = createStore(reducer)
//const appStore = createStore(mainReducer)
//const appStore = createStore(userReducer);


ReactDOM.render(
 
  
    <Provider store={appStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
