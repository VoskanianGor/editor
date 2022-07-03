import React, { useState } from 'react'
import style from './Input.module.css'

export const Input = ({ value, handler, id, type = 'text', children = '', placeholder = '' }) => {

  const [isShow, setIsShow] = useState('')

  return (
    <div className={style.inputWrapper}>
      <div className={style.icon}>{children}</div>
      <input
        className={style.input}
        value={value}
        onChange={(e) => handler(e)}
        type={type}
        placeholder={placeholder}
      />
    </div>
  )
}