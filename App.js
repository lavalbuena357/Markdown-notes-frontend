import React, {useState, useEffect} from 'react'
import auth from '@react-native-firebase/auth'
import {GoogleSignin} from '@react-native-google-signin/google-signin'
import Authentication from './screens/Authentication'
import { Provider } from 'react-redux'
import store from './redux/store'
import Home from './screens/Home'

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '556623505841-qbvqnpvjipa5ahjvdkfccjts6e642liq.apps.googleusercontent.com',
    });
  }, []);  
  
  async function onGoogleButtonPress() {
    const {idToken} = await GoogleSignin.signIn()
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)
    return auth().signInWithCredential(googleCredential)
  }

  auth().onAuthStateChanged((user) => {
    if (user) {
      setAuthenticated(true)
    } else {
      setAuthenticated(false)
    }
  })

  if (authenticated) {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    ) 
  }

  return <Authentication onGoogleButtonPress={onGoogleButtonPress} />
}
export default App
