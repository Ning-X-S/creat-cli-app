import React from 'react'

class TodoClass extends React.Component {
  constructor (props) {
    super(props);
    console.log(this)
    this.state = {
      title: '测试一下试试'
    }
    setTimeout(() => {
      this.setState({
        title: 'classclassclass'
      })
    }, 3000)
  }
  render() {
    return (
      <div>
        <p>Hello, 图雀--{this.props ? this.props.name : ''}</p>
        <p>{this.state ? this.state.title : ''}</p>
      </div>
    )
  }
}

export default TodoClass