import React from 'react';
import '../styles/creat.scss'
// import { Link } from 'react-router-dom'
import { contentList } from '../api/content'
// import List from '../components/creat/list'

// function Creats(props) {
//   console.log(props)
//   return (
//     <div className="list-content" >
//       <p>Creat</p>
//       <div className="link">
//         测试
//       </div>
//     </div>
//   );
// }
function List(props) {
  const elements = (
    props.list.map(item =>
      <div className="list-item" key={item.id}>
        <div className="title">
          <span>{item.title}</span>
        </div>
        <p>{item.desc}</p>
      </div>
    )
  )
  return (
    <div>
      {elements}
    </div>
  )
}

class Creat extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      pageInfo: {
        page: 1,
        size: 20,
      },
      next: 1,
    }
  }
  async componentDidMount () {
    let res = await contentList(this.state.pageInfo)
    console.log(res)
    this.setState({
      list: res.data.list
    })
  }
  render() {
    return (
      <div className="list-content" >
        <div className="list-box-title">内容111</div>
        <List list={this.state.list} />
      </div>
    )
  }
}

// function openName(num, handleClick) {
//   handleClick(num + 1)
// }

export default Creat
  