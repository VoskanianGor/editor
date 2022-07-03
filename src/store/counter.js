import { makeAutoObservable } from 'mobx';


class Counter {
  count = 0

  constructor () {
    makeAutoObservable(this)
  }

  inc = () => this.count += 1
  dec = () => this.count -= 1
  
}

export const counter = new Counter()