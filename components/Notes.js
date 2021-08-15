import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, ScrollView, TextInput, Button, Alert } from 'react-native'
import { MarkdownView } from 'react-native-markdown-view'
import {deleteNote, getNoteId, getNotes, postNote, putNote} from '../redux/actions'

function Notes({getNotes, getNoteId, putNote, deleteNote, postNote, notes, note}) {
  const [saveDisabled, setSaveDisabled] = useState(true)
  const [updateNote, setUpdateNote] = useState({note: ''})
  const [showContent, setShowContent] = useState(false)
  const [create, setCreate] = useState('')
  const [showCreate, setShowCreate] = useState(false)

  useEffect(() => {
    getNotes()
  }, [])  

  function handleEdit() {
    setSaveDisabled(!saveDisabled)
    setUpdateNote({...updateNote, note: note && note.note})
  }

  function handleChange(e) {
    setUpdateNote({...updateNote, note: e})
  }

  async function handleSave() {
    await putNote(note && note._id, updateNote)
    getNoteId(note && note._id)
    setSaveDisabled(!saveDisabled)
  }

  async function handleDelete() {
    Alert.alert(
      "Delete note",
      "Are yoy sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        { text: "OK", onPress: async () => {
          await deleteNote(note && note._id)
          setShowContent(false)
          getNotes()
        }}
      ]
    );
  }

  async function handleShow(_id) {
    await getNoteId(_id)
    setShowContent(true)
    setUpdateNote({note: ''})
    setSaveDisabled(true)
  }

  async function handleCreate() {
    setShowCreate(!showCreate)
    await postNote({note: create})
    getNotes()
    setCreate('')
  }

  return (
    <ScrollView style={styles.notesCtn}>
      {notes.map((el, i) => 
        <View key={i}>
          {el.note ? (
            <Text onPress={() => handleShow(el._id)} style={styles.noteBox}>
              <MarkdownView >{el.note.split('').splice(0,20)}</MarkdownView>
            </Text>
          ) : null}
        </View> 
      )}

      <View style={showContent ? styles.noteContent : styles.noteContentHidden}>
        <View>
          <View style={styles.readBox}>
            <MarkdownView>#{note && note.note.split('').splice(0,20).join('')}</MarkdownView>
            <MarkdownView>{note && note.note}</MarkdownView>
          </View>

          <View style={styles.writeBox}>
            <TextInput 
              value={updateNote.note}
              numberOfLines={5}
              multiline
              editable={!saveDisabled}
              textAlignVertical={'top'}
              onChangeText={(e) => handleChange(e)} 
            />
          </View>
        </View>

        <View>
          <View>
            <Text>Created on {new Date(note && note.createdAt).getDate()}/{new Date(note && note.createdAt).getMonth()+1}/{new Date(note && note.createdAt).getFullYear()}</Text>
            <Text>Contains {note && note.note.length} words</Text>
          </View>

          <View style={{flex:1, flexDirection:'row', justifyContent: 'space-around', marginTop:10}}>
            <Button title='Edit' onPress={handleEdit}/>
            <Button title='Save' disabled={saveDisabled} onPress={handleSave} />
            <Button title='Delete' color='firebrick' onPress={handleDelete} />
            <Button title='Close' color='slategray' onPress={() => setShowContent(false) } />
          </View>
        </View>
      </View>
      
      <View style={{marginBottom: 50, marginTop:20}}>
        <Button onPress={handleCreate} color='limegreen' title='Create note'/>
        <TextInput 
          style={showCreate ? {borderWidth: 1, borderStyle: 'solid', borderColor:'black'}: {display:'none'}}
          value={create}
          numberOfLines={5}
          multiline
          editable
          textAlignVertical={'top'}
          onChangeText={(text) => setCreate(text)} 
        />
      </View>

    </ScrollView>
    
  )
}

function mapStateToProps(state) {
  return {
    notes: state.notes,
    note: state.note
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getNotes: () => dispatch(getNotes()),
    getNoteId: (id) => dispatch(getNoteId(id)),
    putNote: (id, payload) => dispatch(putNote(id, payload)),
    deleteNote: (id) => dispatch(deleteNote(id)),
    postNote: (data) => dispatch(postNote(data))
  }
}

const styles = StyleSheet.create({
  notesCtn: {
    padding: 20,
  },
  noteBox: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    margin: 5
  },
  noteContent: {
    padding: 5,
    margin: 5,
  },
  noteContentHidden: {
    display: 'none',
  },
  readBox: {
    padding: 5
  },
  writeBox: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5,
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Notes)
