import React, {useState} from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, TextInput } from 'react-native'
import { searchNotes } from '../redux/actions'

function SearchBar({searchNotes}) {
  const [search, setSearch] = useState('')

  function handleChange(e) {
    setSearch(e)
    searchNotes(e)
  }

  return (
    <View style={styles.searchCtn}>
      <TextInput 
        placeholder='Search notes' 
        onChangeText={(e) => handleChange(e)} 
        value={search}
        style={styles.inputSearch} />
    </View>
  )
}

const styles = StyleSheet.create({
  searchCtn: {
    marginLeft: 20,
    marginRight: 20
  },
  inputSearch: {
    backgroundColor: 'lightgray',
    borderRadius: 5,
    marginTop: 10,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5
  }
})

function mapDispatchToProps(dispatch) {
  return {
    searchNotes: (data) => dispatch(searchNotes(data))
  }
}

export default connect(null, mapDispatchToProps)(SearchBar)
