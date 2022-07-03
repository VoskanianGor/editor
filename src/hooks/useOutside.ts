import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react'

type TypeOut = {
	ref: any
	isShow: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
	flag: boolean
}

/* 
	Personal Hook
	Hide element when click outside
*/
export const useOutside = (initialIsVisible: boolean, on: 'click' | 'mousedown' = 'mousedown', toggle: boolean = false): TypeOut => {
	const [flag, setFlag] = useState(false)
	const [isShow, setIsShow] = useState(initialIsVisible)
	const ref = useRef<HTMLElement>(null)

	const handleClickOutside = (event: any) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setIsShow(false)
		}

		if (toggle) {
			setFlag(true)
		}
	}

	useEffect(() => {
		document.addEventListener(on, handleClickOutside, true)
		return () => {
			document.removeEventListener(on, handleClickOutside, true)
		}
	})
	return { ref, isShow, setIsShow, flag }
}

// const {ref, isShow, setIsShow} = useOutside(false)
