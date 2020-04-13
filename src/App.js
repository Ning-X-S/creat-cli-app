import React from 'react';
import { Route, BrowserRouter, Redirect, BrowserRouter as hashHistory } from 'react-router-dom'; // import { ConnectedRouter } from 'connected-react-router'
import Home from './views/home'
import About from './views/about'
import Create from './views/create'
import Content from './views/content'
import { getShareInfo } from './api/user'
import './styles/public.scss'
import './App.css';

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
        <Route path="/content" component={Content} />
        <Route path="/create" component={Create} />
      </BrowserRouter>
    )
  }
}

export default App;
