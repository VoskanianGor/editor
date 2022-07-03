import React, { useState } from 'react'
import style from './DropDown.module.css'
import { useOutside } from '../../hooks/useOutside.ts'

export const DropDown = ({ handler }) => {
	const { ref, isShow, setIsShow } = useOutside(false, 'click')
	let [count, setCount] = useState(true)
	const [select, setSelect] = useState('select')

	const clickHandler = (type) => {
		handler(type)
		setSelect(type)
	}

	return (
		<div className={style.selectWrapper}>
			<div onClick={() => {
				if (count) {
					setIsShow(true)
					setCount(false)
				}
				if (!count) {
					setIsShow(false)
					setCount(true)
				}

			}}>{select}</div>
			{isShow && (
				<div ref={ref} className={style.selectList}>
					<div onClick={() => clickHandler('Origin')}>Origin</div>
					<div onClick={() => clickHandler('Translate')}>Translate</div>
					<div onClick={() => clickHandler('fullTranslate')}>
						fullTranslate
					</div>
					<div onClick={() => clickHandler('Chapters')}>Chapters</div>
				</div>
			)}
		</div>
	)
}
