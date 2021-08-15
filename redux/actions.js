import axios from 'axios'
export const GET_NOTES = 'GET_NOTES'
export const GET_NOTE_ID = 'GET_NOTE_ID'
export const SEARCH_NOTES = 'SEARCH_NOTES'
export const POST_NOTE = 'POST_NOTE'
export const PUT_NOTE = 'PUT_NOTE'
export const DELETE_NOTE = 'DELETE_NOTE'

import config from '../config'

export function getNotes() {
  return async function(dispatch) {
    try {
      const notes = await axios.get(config.base_url)
      dispatch({
        type: GET_NOTES,
        payload: notes.data
      })
    } catch (error) {console.log(error)}
  }
}

export function getNoteId(id) {
  return async function(dispacth) {
    try {
      const note = await axios.get(`${config.base_url}/${id}`)
      dispacth({
        type: GET_NOTE_ID,
        payload: note.data
      })
    } catch (error) {console.log(error)}
  }
}

export function searchNotes(note) {
  return async function(dispatch) {
    try {
      const notes = await axios.get(`${config.base_url}?note=${note}`)
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
      await axios.put(`${config.base_url}/${id}`, payload)
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
      await axios.post(config.base_url, payload)
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
      await axios.delete(`${config.base_url}/${id}`)
      dispacth({
        type: DELETE_NOTE
      })
    } catch (error) {console.log(error)}
  }
}