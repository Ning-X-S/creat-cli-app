import React from 'react';
import '../styles/about.scss'
import { Link } from 'react-router-dom'


function About(props) {
  console.log(props)
  return (
    <div className="about" >
      <p>这是关于页面</p>
      <div className="link">
        测试
        <Link to="/home">Go to home</Link>
      </div>
    </div>
  );
}

// function openName(num, handleClick) {
//   handleClick(num + 1)
// }

export default About
  