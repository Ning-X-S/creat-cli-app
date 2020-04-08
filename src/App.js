import React from 'react';
import { Route, BrowserRouter, Redirect, BrowserRouter as hashHistory } from 'react-router-dom'; // import { ConnectedRouter } from 'connected-react-router'
import Home from './views/home'
import About from './views/about.js'
import { getShareInfo } from './api/user'
import Creat from './views/creat'
import './styles/public.scss'
const id = '261755211424354939'

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
      <BrowserRouter history={hashHistory}>
        <Route exact path="/">
          <Redirect to={`/home/${id}`} />
        </Route>
        <Route path="/home/:id" exact component={this.state.isShow ? Home : About} />   
        <Route path="/about" component={About} />
        <Route path="/creat" component={Creat} />
      </BrowserRouter>
    )
  }
}

export default App;
