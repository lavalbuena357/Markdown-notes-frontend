import { GET_NOTES, GET_NOTE_ID, SEARCH_NOTES, PUT_NOTE } from "./actions";

const initialState = {
  notes: [],
  note: null
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTES:
      return {...state,
        notes: action.payload
      }
    case GET_NOTE_ID:
      return {...state,
        note: action.payload
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