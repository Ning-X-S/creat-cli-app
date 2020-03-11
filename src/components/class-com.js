import React from 'react'

class TodoClass extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      title: '测试一下试试'
    }
  }
  componentDidMount() {
    console.log('son-componentDidMount')
    this.timer = setInterval(() => {
      this.tick(this)
    }, 1000)
  }
  tick () {
    // 不能设置new Date()
    // 真特么坑
    this.setState({
      title: new Date().getTime()
    })
  }
  componentWillUnmount() {
    console.log('son-componentWillUnmount')
    if (this.timer) clearTimeout(this.timer)
  }
  render() {
    return (
      <div>
        <p> 图雀--{this.props ? this.props.name : ''}</p>
        <p>{this.state ? this.state.title : ''}</p>
      </div>
    )
  }
}

export default TodoClass