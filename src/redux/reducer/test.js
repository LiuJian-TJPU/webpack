const initialState = {
  headerTitle: '大兴',
  loadingList: []
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'TEST_HEADER_TITLE':
      return {
        ...state,
        headerTitle:action.payload
      }
    case 'START_LOADING':
      return {
        ...state,
        loadingList:[...state.loadingList, { text: action.payload || '加载中。。'}]
      }
    case 'END_LOADING':
      return {
        ...state,
        loadingList:[...(state.loadingList.shift())]
      }
    default:
      return state
  }
}
export default reducer