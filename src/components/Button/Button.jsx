import React from 'react'
import style from './Button.module.css'

export const Button = ({children, handler, type = 'default'}) => {

  const className = () => {
    switch (type) {
      case 'small-rounded':
        return style.smallRounded
      case 'small':
        return style.small
      default:
        break;
    }
  }

  return (

    <div className={`${style.button} ${className()}`} onClick={handler}>
      <div>{children}</div>
    </div>
  )
}