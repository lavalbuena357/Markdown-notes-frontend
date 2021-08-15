import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, ScrollView, TextInput, Button, Alert } from 'react-native'
import {deleteNote, getNotes, postNote, putNote} from '../redux/actions'

function Notes({getNotes, putNote, deleteNote, postNote, notes}) {
  const [saveDisabled, setSaveDisabled] = useState(true)
  const [currentId, setCurrentId] = useState('')
  const [updateNote, setUpdateNote] = useState({note: ''})
  const [showContent, setShowContent] = useState({})
  const [create, setCreate] = useState('')
  const [showCreate, setShowCreate] = useState(false)

  useEffect(() => {
    getNotes()
  }, [])  

  function handleEdit(_id, note) {
    setSaveDisabled(!saveDisabled)
    setUpdateNote({...updateNote, note: note})
    setCurrentId(_id)
  }

  function handleChange(e) {
    setUpdateNote({...updateNote, note: e})
  }

  async function handleSave() {
    await putNote(currentId, updateNote)
    getNotes()
    setSaveDisabled(!saveDisabled)
  }

  async function handleDelete(id) {
    Alert.alert(
      "Delete note",
      "Are yoy sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        { text: "OK", onPress: async () => {
          await deleteNote(id)
          getNotes()
        } }
      ]
    );
  }

  function handleShow(_id) {
    setShowContent(note => ({
      ...note,
      [_id]: !note[_id]
    }))
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
            <Text style={styles.noteBox} onPress={() => handleShow(el._id)}>{el.note.split('').splice(0,20)}</Text>
          ) : null}
          {showContent[el._id] ? 
          <View style={styles.noteContent}>
            <View style={styles.readBox}>
              <Text style={styles.title}>{el.note.split('').splice(0,20)}</Text>
              <Text>{el.note}</Text>
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
            <View>
              <Text>Created on {new Date(el.createdAt).getDate()}/{new Date(el.createdAt).getMonth()+1}/{new Date(el.createdAt).getFullYear()}</Text>
              <Text>Contains {el.note.length} words</Text>
              </View>
            <View style={{flex:1, flexDirection:'row', justifyContent: 'space-around', marginTop:10}}>
              <Button title='Edit' onPress={(_id, note) => handleEdit(el._id, el.note)} />
              <Button title='Save' disabled={saveDisabled} onPress={handleSave} />
              <Button title='Delete' color='firebrick' onPress={() => handleDelete(el._id)} />
              <Button title='Close' color='slategray' onPress={() => handleShow(el._id) } />
            </View>
          </View > : null}
        </View>  
      )}
      <View>
        <Button onPress={handleCreate} color='limegreen' title='Create note'/>
        <TextInput 
        style={showCreate ? {borderWidth: 1, borderStyle: 'solid', borderColor:'black'}: {display:'none'}}
        value={create}
        numberOfLines={5}
        multiline
        editable
        textAlignVertical={'top'}
        onChangeText={(text) => setCreate(text)} />
      </View>
    </ScrollView>
    
  )
}

function mapStateToProps(state) {
  return {
    notes: state.notes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getNotes: () => dispatch(getNotes()),
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
    padding: 5,
    margin: 5
  },
  noteContent: {
    padding: 5,
    margin: 5,
    marginBottom: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 15
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
