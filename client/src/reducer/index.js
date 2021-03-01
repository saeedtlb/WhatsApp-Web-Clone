import { NAME } from '../actions/type'

const reducer = (store, action) => {
  console.log(action)

  switch (action.type) {
    case NAME:
      return {
        ...store,
        name: action.name
      }
    default:
      return store
  }
}

export default reducer
