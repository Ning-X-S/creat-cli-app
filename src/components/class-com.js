import React from 'react'

class TodoClass extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      title: '测试一下试试',
      list: props.list
    }
  }
  componentDidMount() {
    console.log('son-componentDidMount')
    this.timer = setInterval(() => {
      this.tick(this)
    }, 1000)
  }
  componentWillUnmount() {
    console.log('son-componentWillUnmount')
    if (this.timer) clearTimeout(this.timer)
  }
  tick () {
    // 不能设置new Date()
    // 真特么坑
    this.setState({
      title: new Date().getTime()
    })
  }
  render() {
    let element = []
    for (let index = 0; index < this.props.list.length; index++) {
      let item = this.props.list[index]
      element.push(<p key={item.id}>{item.name}</p>)
    }
    return (
      <div>
        <p> 图雀--{this.props ? this.props.name : ''}</p>
        <p>{this.state ? this.state.title : ''}</p>
        {element}
        {this.props.list[0].name}
      </div>
    )
  }
}

export default TodoClass