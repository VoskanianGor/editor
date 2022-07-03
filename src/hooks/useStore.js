import { textStore } from './../store/textStore';

const allActions = {
  ...textStore
}


export const useStore = () => allActions