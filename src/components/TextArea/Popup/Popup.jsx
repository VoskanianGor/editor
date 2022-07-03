import React from 'react'
import style from './Popup.module.css'
import { useOutside } from './../../../hooks/useOutside.ts';

export const Popup = ({ _ref, isShow, text }) => {

  if (!isShow) return

  return (

    <div className={style.popup} ref={_ref}>
      <div className={style.vertText}>{text}</div>

      <div className={style.linksWrapper}>
        <a href={`https://bkrs.info/slovo.php?ch=${text}`}
          target='_blank'
          rel='noreferrer'>
          bkrs
        </a>
        <a href={`https://translate.google.com/?hl=ru&sl=zh-CN&tl=ru&text=${text}&op=translate`}
          target='_blank'
          rel='noreferrer'>
          gt
        </a>
      </div>
    </div>
  )
}