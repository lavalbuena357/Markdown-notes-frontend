import React from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import SearchBar from '../components/SearchBar'
import Notes from '../components/Notes'

function Home() {
  const user = auth().currentUser

  async function signOutUser() {
    await GoogleSignin.revokeAccess()
    await auth().signOut()
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoCtn}>
          <Image style={styles.logo} source={require('../assets/logo.png')}/>
          <Text style={{fontSize: 10}}>Markdown Notes</Text>
        </View>
        <Image style={styles.userImage} source={{ uri: user?.photoURL }}/>
        <Button title="Salir" onPress={() => signOutUser()}/>
      </View>
      <View>
        <SearchBar />
      </View>
      <View>
        <Notes/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 150
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'silver'
  },
  logoCtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo: {
    width: 90,
    height: 20,
    marginRight: 10
  },
  text: {
    fontSize: 16
  },
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 150,
    marginRight: 10
  }
})

export default Home