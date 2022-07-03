
import { makeAutoObservable } from 'mobx';
import { customLocalStorage } from './../hooks/customLocalStorage';


const { getLocal, setLocal } = customLocalStorage()

class TextStore {

  index = getLocal('index') || 0
  allTexts = getLocal('gg') || []
  _currentText = getLocal('current') || ''

  constructor() {
    makeAutoObservable(this)
  }

  addNewText = (newText) => {
    const rawNewText = {
      ...newText,
      totalMoney: Number(newText.moneyCF) * ((Number(newText.wordCount) / 1000) * 100),
      index: this.index,
      chapters: newText.originText.split('#####').slice(1),
      chapterIndex: 0,
    }
    this.allTexts.push(rawNewText)
    this.index += 1
    setLocal('gg', this.allTexts)
    setLocal('index', this.index)
  }

  updateText = (index, value, chapterIndex, scrollTop) => {
    this.allTexts[index].chapters[chapterIndex] = value
    this.allTexts[index].isEdit = true
    this.allTexts[index].scrollTop = scrollTop
    setLocal('gg', this.allTexts)
  }
  
  addNewChunk = (index) => {
    this.allTexts[index].fullTranslate = this.allTexts[index].chapters.join(' ')
    setLocal('gg', this.allTexts)
  }

  setChapterIndex = (index, action) => {
    if (action === 'inc') {
      this.allTexts[index].chapterIndex += 1
      this.allTexts[index].scrollTop = 0
    }
    if (action === 'dec') {
      this.allTexts[index].chapterIndex -= 1
      this.allTexts[index].scrollTop = 0
    }
    setLocal('gg', this.allTexts)
  }
}

export const _textStore = new TextStore()