import React from 'react';
import '../styles/content.scss'
// import { Link } from 'react-router-dom'
import { getList } from '../api/content'
// import List from '../components/creat/list'
import { Button } from 'antd';

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
  function openCreate (id) {
    props.that.props.history.push(`/create?id=${id}`)
  }
  const elements = (
    props.list.map(item =>
      <div className="list-item" onClick={() => openCreate(item.id)} key={item.id}>
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
    let res = await getList(this.state.pageInfo)
    console.log(res)
    this.setState({
      list: res.data.list
    })
  }
  openCreate () {
    console.log(this.props)
    this.props.history.push(`/create`)
  }
  render() {
    return (
      <div className="list-content" >
        <div className="list-box-title">
          <div>内容</div>
          <Button onClick={()=> this.openCreate()} type="primary">新建+</Button>
        </div>
        <List list={this.state.list} that={this} />
      </div>
    )
  }
}

// function openName(num, handleClick) {
//   handleClick(num + 1)
// }

export default Creat
  