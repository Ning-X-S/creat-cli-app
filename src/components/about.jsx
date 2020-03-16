import React from 'react';
import '../styles/about.scss'
import { Link } from 'react-router-dom'

// 兔子繁衍问题
function calcRabbit (year = 0) {
  let mounth = year * 12
  let temp = 0
  let init = 0
  let count = 2
  for (let index = 0; index < mounth; index++) {
    temp = count
    count = init + count
    init = temp
  }
  return count
}

function About(props) {
  console.log(props)
  let num = calcRabbit(1)
  console.log(num)
  return (
    <div className="about" >
      <p>这是关于页面</p>
      <div className="link">
        测试
        <Link to="/home/261755211424354939">Go to home</Link>
      </div>
    </div>
  );
}

// function openName(num, handleClick) {
//   handleClick(num + 1)
// }

export default About
  