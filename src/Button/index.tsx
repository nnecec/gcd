import * as React from 'react'
import './style'

export default function (props) {

  const { onClick, children } = props

  return (
    <button
      className="button"
      onClick={onClick}
    >{children}</button>
  )
}