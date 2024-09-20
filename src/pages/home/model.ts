import {atom} from "shared/lib/factory";
import {createGate} from "effector-react";
import {createEvent, createStore} from "effector";

export const homeModel = atom(() => {
  const HomeGate = createGate()

  const increment = createEvent()
  const decrement = createEvent()

  const $count = createStore(0)

  $count
    .on(increment, state => state + 1)
    .on(decrement, state => state - 1)

  return {
    HomeGate,
    $count,
    increment,
    decrement
  }
})
