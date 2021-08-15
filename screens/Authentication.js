import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'

function Authentication({onGoogleButtonPress}) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} />
      <Text style={styles.title}>Markdown Notes</Text>
      <GoogleSigninButton 
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={onGoogleButtonPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'silver'
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
  },
});

export default Authentication