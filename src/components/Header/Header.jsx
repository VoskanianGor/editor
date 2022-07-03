import React, {useEffect} from 'react'
import style from './Header.module.css'
import { Menu } from './Menu/Menu'
import { useOutside } from './../../hooks/useOutside.ts';

export const Header = ({_setIsShow}) => {

  const { ref, isShow, setIsShow} = useOutside(false, 'click')
  

  return (

    <div className={style.header}>
      <div className={style.burgerWrapper} onClick={()=>setIsShow(true)}>
        <div className={style.burger}></div>
      </div>
      <div>♥</div>

      {
        isShow &&
        <div className={style.menu} ref={ref} >
          <Menu setIsShow={_setIsShow} setSideBarShow={setIsShow}/>
        </div>
      }

    </div>
  )
}