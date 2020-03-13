import React from 'react';


function Son(props) {
  // console.log(props)
  const { num, handleClick } = props;
  // console.log(handleClick)
  return (
    <div
      onClick={() => {
        handleClick(num + 1)
      }}
    >
      child{num}
    </div>
  );
}

// function openName(num, handleClick) {
//   handleClick(num + 1)
// }

export default Son
  