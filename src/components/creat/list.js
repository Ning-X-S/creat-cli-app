import React from 'react';

function List(props) {
  const elements = (
    props.list.map(item =>
      <div key={item.id}>
        <div>
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


export default List