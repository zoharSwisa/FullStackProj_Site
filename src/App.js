import React, {Component} from 'react';
import MainComp from './components/MainComp';
import './App.css'

class App extends Component
{
  constructor(props)
  {
    super(props)
  }
 
  render()
  {
    return(<div>
      <MainComp /> 
    </div>)
  }
}


export default App;
