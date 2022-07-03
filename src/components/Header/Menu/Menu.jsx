import React from 'react'
import style from './Menu.module.css'
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom'
import { _textStore } from '../../../store/_textStore';

export const Menu = observer(({setIsShow, setSideBarShow}) => {

  const {allTexts} = _textStore

  return (

    <div className={style.menu}>
      <h1 onClick={()=>{setIsShow(true); setSideBarShow(false)}}>+</h1>
      {allTexts?.map(el => {
        return (
          <NavLink to={`/texts/${el.index}`} key={el.id}>
            {el.title}
          </NavLink>
        )
      })}
    </div>
  )
})