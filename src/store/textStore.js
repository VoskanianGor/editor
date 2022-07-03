import { makeAutoObservable } from "mobx";
import { nanoid } from "nanoid";
import { customLocalStorage } from '../hooks/customLocalStorage';

const {getLocal, setLocal} = customLocalStorage()

class TextStore {
  allTexts = getLocal('text/all') || []
  originText = getLocal('text/origin') || ''
  currentText = getLocal('text/current') || ''
  selectedText = getLocal('text/selected') || ''

  text = {
    id: '',
    title: '',
    originText: this.originText,
    currentText: this.currentText,
    dateCreated: new Date().setUTCDate(),
    dateStart: '',
    dateEnd: '',
    daysLag: '',
    wordCount: 0,
    moneyCf: 0,
  }

  constructor () {
    makeAutoObservable(this)
  }

  setCurrentText = (payload) => {
    this.currentText = payload
    setLocal('text/current', this.currentText)
  }

  uploadText = (payload) => {
    this.originText = payload
    setLocal('text/origin', this.originText)
    this.currentText = payload
    setLocal('text/current', this.currentText)
  }

  addText = () => {
    this.text.id = nanoid(6)
    this.text.wordCount = this.text.originText.replace(/[。：？#一，”…！0-9第章“]/g, '').length
    this.allTexts.push(this.text)
    setLocal('text/all', this.allTexts)
    this.text = {
      id: '',
    title: '',
    originText: this.originText,
    currentText: this.currentText,
    dateCreated: new Date().setUTCDate(),
    dateStart: '',
    dateEnd: '',
    daysLag: '',
    wordCount: 0,
    moneyCf: 0,
    }
  }

  setText = (payload) => {
    this.text = {...this.text, ...payload}
    this.text.daysLag = this._daysLag(this.text.dateStart,this.text.dateEnd)
    setLocal('text', this.text)
  }

  _daysLag(start, end){
    return Math.ceil(Math.abs(new Date(start).getTime() - new Date(end).getTime()) / (1000 * 3600 * 24))
  }

  setSelected = (id) => {
    this.selectedText = this.allTexts.filter(el => {
      return el.id === id && el
    })
    setLocal('text/selected', this.selectedText)
  }

  updateSelectedText = (payload, id) => {
    this.allTexts.forEach(el => {
      if (el.id === id) {
        this.selectedText[0].currentText = payload
        el.currentText = payload
      }
    })
    setLocal('text/all', this.allTexts)
  }
  
}

export const textStore = new TextStore()