export const customLocalStorage = () => {

  const setLocal = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const getLocal = (key) => {
    return JSON.parse(localStorage.getItem(key))
  }

  return {setLocal, getLocal}
}