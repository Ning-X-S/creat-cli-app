import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoClass from './components/class-com'
import Todo from './components/functional'

const dataChe = '哈哈哈哈哈哈'

// function App() {
//   // const element = <div className="App">
//   //     <header className="App-header">
//   //       <img src={logo} className="App-logo" alt="logo" />
//   //       <p>
//   //         Edit <code>src/App.js</code> and save to reload.
//   //       </p>
//   //       <a
//   //         className="App-link"
//   //         href="https://reactjs.org"
//   //         target="_blank"
//   //         rel="noopener noreferrer"
//   //       >
//   //         Learn React 1
//   //       </a>
//   //     </header>
//   //   </div>
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React 2
//         </a>
//       </header>
//     </div>
//   )
// }


class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      logo: logo,
      title: '测试一下试试',
      name: 'class',
      url: 'https://pic.lehe.com/pic/_o/14/b4/7a7025435f86b813f29af85c8ec3_453_453.cz.jpg_cd579946_s5_150_150.jpg'
    }
  }
  openSrc (name) {
    console.log(name)
    console.log(this)
    this.setState({
      name
    })
  }
  openSrcImg (data) {
    console.log(data)
    console.log(this)
  }
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img onClick={(e) => this.openSrcImg(this.state.logo)} src={this.state.url}  alt="avator" />
          <img src={this.state.logo} className="App-logo" alt="logo" />
          <p onClick={this.openSrc.bind(this, dataChe)}>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React 2
          </a>
          <TodoClass name={this.state.name} title={this.state.title} />
          <Todo name="functional" />
        </header>
      </div>
    )
  }
}

export default App;
