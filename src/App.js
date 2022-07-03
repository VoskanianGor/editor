import './App.css';
import { Route, Routes } from 'react-router-dom'
import { AddNewText } from './components/AddNewText/AddNewText';
import { TextArea } from './components/TextArea/TextArea'
import { observer } from 'mobx-react-lite';
import { _textStore } from './store/_textStore';
import { Counter } from './components/Counter/Counter';
import { counter } from './store/counter';
import { useOutside } from './hooks/useOutside.ts';
import { Header } from './components/Header/Header';

export const App = observer(() => {

  const {ref, isShow, setIsShow} = useOutside(false)
  const {allTexts} = _textStore

  return (
    <div className="App">
      <Header _setIsShow={setIsShow}/>
      <AddNewText _ref={ref} isShow={isShow} setIsShow={setIsShow}/>
      {/* <Menu/> */}
      <Routes>
      <Route path='/' element={<div>create a new file</div>}/>
      <Route path='texts/:index' element={<TextArea/>} />

      </Routes>
      

    </div>
  );
})

