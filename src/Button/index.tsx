import * as React from 'react'

export default function (props) {

  const { onClick, children } = props

  return (
    <button
      className="button"
      onClick={onClick}
    >{children}</button>
  )
}