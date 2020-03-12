import React from 'react';
import logo from '../logo.svg';
import '../styles/home.css';
import { userInfo, getShareInfo } from '../api/user'
import TodoClass from './class-com'
import Todo from './functional'
import { open } from '../scheme'
import { Link } from 'react-router-dom'

const dataChe = '哈哈哈哈哈哈'


// function Home() {
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


// function TodoControl () {

// }

async function getUserInfo (accountId = '', that) {
  try {
    let params = {
      show_account_id: accountId
    }
    let res = await userInfo(params)
    res.data.follow_status = Number(res.data.follow_status)
    that.setState({
      userInfo: res.data
    })
    if (res.data.nick_name.length > 9) {
      document.querySelector('title').innerHTML = res.data.nick_name.substring(0, 6) + '...'
    } else {
      document.querySelector('title').innerHTML = res.data.nick_name
    }
  } catch (err) {
    console.log(err)
    // 导航栏显示黑色scheme
    open.xz_show_share_navigation_bar({
      back_button_type: 0
    })
  }
}

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      logo: logo,
      logo1: 'http://cdn.duitang.com/uploads/item/201410/21/20141021130151_ndsC4.jpeg',
      title: '测试一下试试',
      name: 'class',
      url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3323152762,4277374593&fm=26&gp=0.jpg',
      userInfo: {
        account_id: '261755211424354939'
      },
      isShowTodo: true,
      list: [
        {
          name: '张三',
          id: 1
        },
        {
          name: '李四',
          id: 2
        }
      ],
      todoList: [
        {
          name: '肥肥',
          id: 3
        },
        {
          name: '涛涛',
          id: 4
        }
      ]
    }
    console.log('app-init')
  }
  async componentDidMount () {
    console.log('app-componentDidMount')
    await getUserInfo(this.state.userInfo.account_id , this) 
    await this.getShareInfoFun()
    console.log(this)
  }
  async getShareInfoFun () {
    try {
      let res = await getShareInfo({
        source: 'xiaozhuo'
      })
      this.setState({
        shareInfo: res.data
      })
    } catch (err) {
      console.log(err)
    }
  }
  openSrc (name) {
    this.setState({
      name
    })
  }
  openSrcImg (data) {
    this.setState({
      isShowTodo: false
    })
  }
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img onClick={(e) => this.openSrcImg(this.state.url)} className="liuxing" src={this.state.url}  alt="avator" />
          {/* <img src={this.state.logo} className="App-logo" alt="logo" /> */}
          <img src={this.state.logo1} className="App-logo" alt="logo" />
          <p onClick={this.openSrc.bind(this, dataChe)}>
            点 <code>一下</code> 试试
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer">
            
          </a>
          <Link to="/about">什么东西都得试</Link>
          {
          this.state.isShowTodo ? 
          <TodoClass
            name={this.state.name}
            title={this.state.title}
            list={this.state.list} /> 
          : <Todo list={this.state.todoList} name="functional" />}
          <Todo
            list={this.state.todoList}
            name="functional" />
        </header>
      </div>
    )
  }
}

export default Home;