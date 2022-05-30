// import react from 'react'
import {createStore} from 'redux'

function actionsOn(
  state = {array: [], totalAmount: 0, totalQuantity: 0},
  action,
) {
  const orderedList = state.array.map(each => each.title)
  switch (action.type) {
    case 'add':
      //   console.log(state)
      if (orderedList.includes(action.data.title)) {
        const val = state.array.filter(each => each.title === action.data.title)
        const [kaval] = val
        kaval.quantity += 1
        console.log(state)

        return state
      }
      return {
        array: [...state.array, {...action.data, quantity: 1}],
        totalQuantity: state.array.length + 1,
      }

    case 'remove':
      if (orderedList.includes(action.data.title)) {
        const val = state.array.filter(each => each.title === action.data.title)
        const [kaval] = val

        if (kaval.quantity > 1) {
          kaval.quantity -= 1
        }
        console.log(state)

        return state
      }
      return state
    default:
      return state
  }
}

const store = createStore(actionsOn)

export default store
