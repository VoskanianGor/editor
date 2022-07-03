import React, { useState } from 'react'
import { observer } from 'mobx-react-lite';
import { nanoid } from 'nanoid';
import { useOutside } from './../../hooks/useOutside.ts';
import style from './AddNewText.module.css'
import { _textStore } from './../../store/_textStore';
import { Input } from './../Input/Input';
import { ReactComponent as DateStartIcon } from '../../assets/icons/calendar-due.svg';
import { ReactComponent as DateEndIcon } from '../../assets/icons/calendar-next.svg';
import { ReactComponent as DollarIcon } from '../../assets/icons/dollar.svg';
import { ReactComponent as TitleIcon } from '../../assets/icons/details-less.svg';
import { ReactComponent as AddFileIcon } from '../../assets/icons/file-add.svg';
import { Button } from '../Button/Button';

export const AddNewText = observer(({_ref, isShow, setIsShow}) => {


  const [filePlaceholder, setFileplaceholder] = useState('')
  let [newText, setNewText] = useState({})
  const { addNewText } = _textStore

  const inputs = [
    {
      key: 'title',
      type: 'text',
      value: newText?.title,
      icon: TitleIcon,
      placeholder: 'Title here'
    },
    {
      key: 'dateStart',
      type: 'date',
      value: newText?.dateStart,
      icon: DateStartIcon,
      placeholder: 'Set date start'
    },
    {
      key: 'dateEnd',
      type: 'date',
      value: newText?.dateEnd,
      icon: DateEndIcon,
      placeholder: 'Set date end'
    },
    {
      key: 'moneyCF',
      type: 'number',
      value: newText?.moneyCF,
      icon: DollarIcon,
      placeholder: 'Yuan course'
    },
  ].map(el => <Input key={el.key} type={el.type} value={el?.value} handler={(e) => setNewText({ ...newText, [el.key]: e.target.value })} placeholder={el.placeholder}>
    <el.icon />
  </Input>)


  const importFile = (e) => {
    let fr = new FileReader()
    fr.readAsText(e.target.files[0])
    fr.onload = () => {
      setNewText({ ...newText, originText: fr.result })
      setFileplaceholder('loaded!')
    }
  }
  // .replace(/[\r\n | \n | \n\n]/g, '')
  const finalNewText = {
    ...newText,
    translateText: newText.originText,
    fullTranslate: '',
    id: nanoid(6),
    dateCreated: new Date().toISOString(),
    daysLag: Math.ceil(Math.abs(new Date(newText?.dateStart).getTime() - new Date(newText?.dateEnd).getTime()) / (1000 * 3600 * 24)),
    wordCount: newText?.originText?.replace(/[。：？#一，”…！0-9第章“\r\n | \n | \n\n]/g, '').length,
    isEdit: false
  }

  const addTextHandler = () => {
    addNewText(finalNewText)
    console.log(finalNewText)
    setNewText({ title: '', dateStart: '', dateEnd: '', originText: '', moneyCF: 0 })
    setIsShow(false)
  }

  if (!isShow) return

  return (

    

    <div className={style.addNewText} ref={_ref}>
      {inputs}

      <div className={style.addFile}>
        <input type='file' id='file' onChange={(e) => importFile(e)} style={{ display: 'none' }} />
        <label for='file'>

          <AddFileIcon fill='#36597d' />
          {filePlaceholder || 'add file'}
        </label>
      </div>

      <div className={style.center}>
        <Button handler={addTextHandler} type=''>
          {'add'}
        </Button>
      </div>
    </div>

  )
})