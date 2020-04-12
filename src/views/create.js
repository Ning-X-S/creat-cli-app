import React from 'react';
import '../styles/cteate.scss'
// import { Link } from 'react-router-dom'
import { getDetail, updateContent, createContent } from '../api/content'
import queryString from 'query-string';
import { Input } from 'antd';
import { Button } from 'antd';

const { TextArea } = Input;


class Creat extends React.Component {
  constructor (props) {
    super(props)
    let params = queryString.parse(this.props.location.search)
    this.state = {
      id: params.id,
      info: {
        title: '',
        desc: ''
      }
    }
  }
  async componentDidMount () {
    console.log('create-componentDidMount')
    if (this.state.id) {
      let res = await getDetail({id: this.state.id})
      console.log(res)
      this.setState({
        info: res.data
      })
    }
  }
  onChange = e => {
    this.setState({
      info: {
        ...this.state.info,
        title: e.target.value
      }
    })
  }
  onChangeDesc = (e) => {
    this.setState({
      info: {
        ...this.state.info,
        desc: e.target.value
      }
    })
  }

  async submit () {
    console.log(this)
    try {
      console.log(this.state.info)
      let params = {
        title: this.state.info.title,
        desc: this.state.info.desc
      }
      if (this.state.id) {
        params.id = this.state.id
        await updateContent(params)
      } else {
        await createContent(params)
      }
      this.props.history.goBack()
    } catch (err) {
      console.log(err)
    }
    
  }

  render() {
    return (
      <div className="edit-content">
        <Input type="text" value={this.state.info.title} placeholder="请输入文章标题" allowClear onChange={this.onChange} />
        <br />
        <br />
        <TextArea type="text" autoSize={{ minRows: 4 }} value={this.state.info.desc} placeholder="请输入正文内容" allowClear onChange={this.onChangeDesc} />

        <Button onClick={()=> this.submit()} type="primary">{this.state.id ? '修改' : '创建'}</Button>
      </div>
    )
  }
}

// function openName(num, handleClick) {
//   handleClick(num + 1)
// }

export default Creat
  