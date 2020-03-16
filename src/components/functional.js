import React, { useState } from 'react';
import Son from './son.jsx'

function Todo(props) {
  const { num, setId} = useState(100)
  const elements = (
    props.list.map(item =>
      <div key={item.id}>
        <div>
          <span>{item.id}</span>
          <span>{item.name}</span>
        </div>
        <p>{item.name}{item.id}</p>
      </div>
    )
  )
  return (
    <div>
      <p> 图雀--{props.name}</p>
      {elements}
      <Son num={num} handleClick={setId} />
    </div>
  )
}


export default Todo