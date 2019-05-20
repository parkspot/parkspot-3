import { StyleSheet } from 'react-native'
import { vw, vh } from 'react-native-expo-viewport-units';

const bars = StyleSheet.create({
  searchbar: {
    width: vw(90),
    height: 30,
    alignSelf: "center",
    justifyContent: "space-around",
    backgroundColor: 'white',
    borderRadius: 50,
  },
})

export default bars