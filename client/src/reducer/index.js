import { NAME, SOCKET } from '../actions/type'

const reducer = (store, action) => {
  console.log(action)

  switch (action.type) {
    case NAME:
      return {
        ...store,
        name: action.name
      }
    case SOCKET:
      return {
        ...store,
        socket: action.socket
      }
    default:
      return store
  }
}

export default reducer
