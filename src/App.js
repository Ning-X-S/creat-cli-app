import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'; // import { ConnectedRouter } from 'connected-react-router'
import Home from './components/home'
import About from './components/about'
import './styles/public.scss'

class App extends React.Component {
  render () {
    return (
      <Router>
        <Route path="/home" component={Home} />            
        <Route path="/about" component={About} />
      </Router>
    )
  }
}

export default App;
