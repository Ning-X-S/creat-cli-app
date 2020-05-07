import React, { useState } from "react"
import '../styles/hook.scss'

export default function Button() {
  const [buttonText, setButtonText] = useState("Click me,   please")

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
    </div>
  )
}