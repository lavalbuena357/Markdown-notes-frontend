import axios from 'axios'
export const GET_NOTES = 'GET_NOTES'
export const SEARCH_NOTES = 'SEARCH_NOTES'
export const POST_NOTE = 'POST_NOTE'
export const PUT_NOTE = 'PUT_NOTE'
export const DELETE_NOTE = 'DELETE_NOTE'

export function getNotes() {
  return (
    async function(dispatch) {
      try {
        const notes = await axios.get('http://192.168.42.149:3001/notes')
        dispatch({
          type: GET_NOTES,
          payload: notes.data
        })
      } catch (error) {console.log(error)}
    }
  )
}

export function searchNotes(note) {
  return async function(dispatch) {
      try {
        const notes = await axios.get(`http://192.168.42.149:3001/notes?note=${note}`)
        dispatch({
          type: SEARCH_NOTES,
          payload: notes.data
        })
      } catch (error) {console.log(error)}
    }
  
}

export function putNote(id, payload) {
  return async function(dispacth) {
      try {
        await axios.put(`http://192.168.42.149:3001/notes/${id}`, payload)
        dispacth({
          type: PUT_NOTE,
          payload: payload
        })
      } catch (error) {console.log(error)}
    }
}

export function postNote(payload) {
  return async function(dispacth) {
      try {
        await axios.post('http://192.168.42.149:3001/notes', payload)
        dispacth({
          type: POST_NOTE,
          payload: payload
        })
      } catch (error) {console.log(error)}
    }
}

export function deleteNote(id) {
  return async function(dispacth) {
      try {
        await axios.delete(`http://192.168.42.149:3001/notes/${id}`)
        dispacth({
          type: DELETE_NOTE
        })
      } catch (error) {console.log(error)}
    }
}