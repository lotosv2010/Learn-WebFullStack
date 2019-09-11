// import { UPDATE_TITLE } from '../actions/title';

const initialState = '点我！点我！点我！'

export default (state = initialState, action = {}) => {
  const { type, data} = action
  switch (type) {
    case 'UPDATE_TITLE':
      return data
    default:
      return state;
  }
}