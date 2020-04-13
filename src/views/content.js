import React from 'react';
import '../styles/content.scss'
// import { Link } from 'react-router-dom'
import { getList, deleteContent } from '../api/content'
// import List from '../components/creat/list'
import { Button } from 'antd';
import { Toast } from 'antd-mobile';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { Modal } from 'antd-mobile';

const alert = Modal.alert;


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

async function deleteCont (id, that) {
  try {
    let res = await deleteContent({id: id})  
    Toast.info(res.data.message)
    await that.getList()
  } catch (err) {
    Toast.info(err.message)
  }
}
function List(props) {
  function openCreate (id) {
    props.that.props.history.push(`/create?id=${id}`)
  }
  function deleteContent (item) {
    alert('温馨提示', `Are you sure 删除 ${item.title}???`, [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      { text: '确认', onPress: async () => {
        await deleteCont(item.id, props.that)
      } },
    ]);
  }
  const elements = (
    props.list.map(item =>
      <div className="list-item" key={item.id}>
        <div className="title">
          <span>{item.title}</span>
        </div>
        <p>{item.desc}</p>

        <div className="opt">
          <div className="opt-box">
            <div className="icon"><FormOutlined onClick={() => openCreate(item.id)} /></div>
            <div className="icon"><DeleteOutlined onClick={() => deleteContent(item)} /></div>
          </div>
        </div>
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
    await this.getList()
  }
  async getList() {
    try {
      Toast.loading('Loading...', 30, () => {
        console.log('Load complete !!!');
      });
      let res = await getList(this.state.pageInfo)
      Toast.hide();
      this.setState({
        list: res.data.list
      })
    } catch (err) {
      console.log(err)
      Toast.info(err.message)
    }
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
  