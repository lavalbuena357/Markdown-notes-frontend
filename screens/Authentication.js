import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'

function Authentication({onGoogleButtonPress}) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} />
      <Text style={styles.title}>iniciar sesión con Google</Text>
      <GoogleSigninButton onPress={onGoogleButtonPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 30,
  },
});

export default Authentication