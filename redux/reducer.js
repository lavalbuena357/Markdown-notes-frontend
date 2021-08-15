import { GET_NOTES, SEARCH_NOTES, PUT_NOTE } from "./actions";

const initialState = {
  notes: []
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTES:
      return {...state,
        notes: action.payload
      }
      case SEARCH_NOTES:
        return {...state,
          notes: action.payload
        }
      case PUT_NOTE:
        return {...state,
          notes: state.notes
        }
    default:
      return state
  }
}

export default reducer