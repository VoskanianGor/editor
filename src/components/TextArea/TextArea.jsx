import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState, useTransition } from 'react'
import { useParams } from 'react-router-dom'
import style from './TextArea.module.css'
import { ReactComponent as LeftIcon } from '../../assets/icons/chevron-left.svg'
import { ReactComponent as RightIcon } from '../../assets/icons/chevron-right.svg'
import { ReactComponent as ReloadIcon } from '../../assets/icons/redo.svg'


import { _textStore } from './../../store/_textStore';
import { useOutside } from './../../hooks/useOutside.ts';
import { Popup } from './Popup/Popup';
import { Button } from '../Button/Button';
import { DropDown } from '../DropDown/DropDown';

const filterBySearch = (ent, search) => ent.filter(item => search.includes(search))

export const TextArea = observer(() => {

  const { ref, isShow, setIsShow } = useOutside(false)

  const { index } = useParams()
  const { allTexts, updateText, addNewChunk, setChapterIndex } = _textStore
  // const [scrollProgress, setScrollProgress] = useState(0)

  const [limit, setLimit] = useState({
    start: 0,
    end: 100,
    step: 100,
  })

  const currentText = allTexts[index];
  const { chapterIndex, scrollTop } = currentText
  const wordCount = currentText.wordCount

  const [valueType, setValueType] = useState('chapters')


  const [search, setSearch] = useState('')


  const [selected, setSelected] = useState({
    progress: 0
  })


  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const isType = (type) => {
    switch (type) {
      case 'Chapters':
        return currentText.chapters[chapterIndex]

      case 'Origin':
        return currentText.originText

      case 'Translate':
        return currentText.translateText

      case 'fullTranslate':
        return currentText.fullTranslate

      default:
        return currentText.chapters[chapterIndex]
    }
  }

  console.log(selected)

  useEffect(() => {
    document.querySelector(`.${style.textArea}`).scrollTop = scrollTop
  })

  return (

    <div className={style.wrapper}>


      <DropDown handler={setValueType} />
      <div className={style.textAreaWrapper}>
        <textarea className={style.textArea}
          value={
            isType(valueType)
          }

          onChange={(e) => {
            updateText(index, e.target.value, chapterIndex, e.target.scrollTop)
          }}

          onSelect={
            (e) => {
              if (document.getSelection().toString()) {

                setSelected({
                  text: document.getSelection().toString(),
                  position: e.target.selectionStart,
                  progress: (currentText.originText.lastIndexOf(document.getSelection().toString()) + document.getSelection().toString().length) / currentText.originText.length * 100,
                  translatedCount: currentText.originText.slice(0, currentText.originText.lastIndexOf(document.getSelection().toString())).length
                })
                setIsShow(true)
              }
            }} />
        <div className={style.progressBar}>
          <div style={{ width: `${selected.progress}%` }}></div>
        </div>
        <Popup _ref={ref} isShow={isShow} text={selected.text} />
      </div>

      {/* {selected.progress}
      <h1>{selected.positionInOriginText}</h1>
      <h2>{selected.translatedCount}</h2> */}




      <div className={style.controlButtonsWrapper}>
        <div className={chapterIndex < 1 ? style.disabledButton : ''}>
          <Button handler={() => setChapterIndex(index, 'dec')} type={'small'}>
            <LeftIcon />
          </Button>
        </div>
        <div className={chapterIndex > (currentText.chapters.length - 2) ? style.disabledButton : ''}>
          <Button handler={() => setChapterIndex(index, 'inc')} type={'small'}>
            <RightIcon />
          </Button>
        </div>

        {/* <Button handler={() => addNewChunk(index)}>
          <ReloadIcon />
        </Button> */}
      </div>
      {/* <button
        className={chapterIndex >= (currentText.chapters.length - 1) ? style.disabledButton : ''}
        onClick={() => {
          setChapterIndex(index, 'inc')

        }}>
        next
      </button>
      <button
        className={chapterIndex < 1 ? style.disabledButton : ''}
        onClick={() => {
          setChapterIndex(index, 'dec')

        }}>
        prev
      </button> */}


      {/* <Button handler={() => addNewChunk(index)}>
        <ReloadIcon />
      </Button> */}

    </div>
  )
})