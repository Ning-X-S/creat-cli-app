import React from 'react';
import { Route, BrowserRouter as Router, Redirect, BrowserRouter as hashHistory } from 'react-router-dom'; // import { ConnectedRouter } from 'connected-react-router'
import Home from './components/home'
import About from './components/about'
import { getShareInfo } from './api/user'
import './styles/public.scss'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isShow: false
    }
  }
  async componentDidMount () {
    await this.getShareInfoFun()
  }
  async getShareInfoFun () {
    try {
      let res = await getShareInfo({
        source: 'xiaozhuo'
      })
      this.setState({
        shareInfo: res.data,
        isShow: true
      })
    } catch (err) {
      console.log(err)
    }
  }
  render () {
    return (
      <Router history={hashHistory}>
        <Route exact path="/">
          <Redirect to="/home/261755211424354939" />
        </Route>
        <Route path="/home/:id" component={this.state.isShow ? Home : About} />   
        <Route path="/about" component={About} />
      </Router>
    )
  }
}

export default App;
