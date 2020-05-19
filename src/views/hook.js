import React, { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { Toast } from 'antd-mobile';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { getList, deleteContent } from '../api/content'
import '../styles/content.scss'
import { Modal } from 'antd-mobile';
import '../styles/hook.scss'
import { Button } from 'antd';

import { connect } from 'react-redux'
import store from '../redux/store'
import { switchTitle} from '../redux/action'

const alert = Modal.alert;


function ContentItem (props) {
  const { list, prop, getListData } = props
  const elements = (
    list.map(item =>
      <div className="list-item" key={item.id}>
        <div className="title">
          <span>{item.title}</span>
        </div>
        <p>{item.desc}</p>
        <div className="opt">
          <div className="opt-box">
            <div className="icon"><FormOutlined onClick={() => {openCreate(item.id)}} /></div>
            <div className="icon"><DeleteOutlined onClick={() => {deleteContentFunc(item)}} /></div>
          </div>
        </div>
      </div>
    )
  )
  return (
    <div className="list-content-hook">
      <div className="list-box-title">
          <div onClick={() => {store.dispatch(switchTitle('这是列表页'))}}>内容{props.prop.tempTitle}</div>
          <Button onClick={()=> openCreate()} type="primary">新建+</Button>
        </div>
      {elements}
    </div>
  )
  function openCreate (id) {
    if (id) prop.history.push(`/create?id=${id}`)
    else prop.history.push(`/create`)
  }
  async function deleteCont (id) {
    try {
      let res = await deleteContent({id: id})  
      Toast.info(res.data.message)
      await getListData()
    } catch (err) {
      Toast.info(err.message)
    }
  }
  function deleteContentFunc (item) {
    alert('温馨提示', `Are you sure 删除 ${item.title}???`, [
      { text: '取消', onPress: async () => {
        console.log('cancel')
        await getListData()
      }, style: 'default' },
      { text: '确认', onPress: async () => {
        await deleteCont(item.id)
      } },
    ]);
  }
}

// 操作dom
function AutofocusInput() {
  const [content, setContent] = useState("");
  const ref = useRef(null);
  const refDiv = useRef(null);
  useEffect(() => {
    console.log(ref, refDiv)
    if (ref && ref.current) {
      ref.current.focus();
    }
  }, []);
  return (
    <div>
      <input
        ref={ref}
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div ref={refDiv}>测试ref</div>
    </div>
  );
}

// 计算属性
function DisplayName({ firstName, lastName }) {
  const displayName = useMemo(() => {
    return `${firstName} ${lastName}`;
  }, [firstName, lastName]);
  return <div>{displayName}</div>;
}


function FirstHook(props) {
  const [buttonText, setButtonText] = useState("Click me,   please")
  const [list, setList] = useState([])
  const [pageInfo, setPageInfo] = useState({ page: 1, size: 20})
  const getListData = useCallback(async () => { 
    try {
      console.log(setPageInfo)
      Toast.loading('Loading...', 30, () => {
        console.log('Load complete !!!');
      });
      let res = await getList(pageInfo)
      Toast.hide();
      setList(list => res.data.list)
    } catch (err) {
      console.log(err)
      Toast.info(err.message)
      setList(list => [])
    }
  }, [pageInfo])
  useEffect(_ => {
    getListData()
    // async function getListData() {
    //   try {
    //     Toast.loading('Loading...', 30, () => {
    //       console.log('Load complete !!!');
    //     });
    //     let res = await getList(pageInfo)
    //     Toast.hide();
    //     setList(list => res.data.list)
    //   } catch (err) {
    //     console.log(err)
    //     Toast.info(err.message)
    //     setList(list => [])
    //   }
    // }
  }, [getListData, pageInfo])
  useEffect(() => {
    console.log(props.location);
  }, [props.location])
  function handleClick() {
    if (buttonText=== 'Click me,   please') {
      return setButtonText("Thanks, been clicked!")
    } else {
      return setButtonText("Click me,   please")
    }
  }
  return (
    <div className="hook">
      <button onClick={handleClick}>{buttonText}</button>
      <AutofocusInput />
      <DisplayName firstName="Hello" lastName="World" />
      <CandyDispenser />
      <ContentItem list={list} prop={props} getListData={getListData} />
    </div>
  )
}

function CandyDispenser() {
  const initialCandies = ['snickers', 'skittles', 'twix', 'milky way']
  const [candies, setCandies] = useState(initialCandies)
  const dispense = candy => {
    setCandies(allCandies => allCandies.filter(c => c !== candy))
  }
  return (
    <div>
      <h1>Candy Dispenser</h1>
      <div>
        <div>Available Candy</div>
        {candies.length === 0 ? (
          <button onClick={() => setCandies(initialCandies)}>refill</button>
        ) : (
          <ul>
            {candies.map(candy => (
              <li key={candy}>
                <button onClick={() => dispense(candy)}>grab</button> {candy}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    tempTitle: state.tempTitle
  }
}

export default connect(mapStateToProps)(FirstHook)