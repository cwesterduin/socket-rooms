const myReducer = (state = [{user: 'admin', message: 'welcome!'}], action) => {
    switch (action.type) {
      case 'ADD_MESSAGE':
        return state.concat([action.payload])
      default:
        return state
    }
  }

  export default myReducer;