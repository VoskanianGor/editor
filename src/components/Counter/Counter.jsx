import React from 'react'
// import style from './Counter.module.scss'
import { counter } from './../../store/counter';
import { observer } from 'mobx-react-lite';
import { textStore } from './../../store/textStore';

export const Counter = observer(() => {

  const {count, dec, inc} = counter

  return (

    <div>
     <button onClick={inc}>+</button>
     <button onClick={dec}>-</button>
     {textStore.currentText}
    </div>
  )
})