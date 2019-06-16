//React dependencies
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
//Styles

class WeatherIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      temp:0,
      city: "gent"
     };
   }

   f38af33bc60ddd081f0bf546afb23f4a

   componentDidMount(){
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + this.state.city + "&units=metric&appid=f38af33bc60ddd081f0bf546afb23f4a")
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
       loading: false,
       temp: Math.round(responseJson['main']['temp'])
      })
    })
    .catch(error=>console.log(error)) //to catch the errors if any
    }

  render() {
    //console.log(this.state.temp)
    return (
      <View style={styles.container}>
        <Image
          style={{width: 40, height: 40}}
          source={require('../assets/sun.png')}
        />
        <Text style={styles.text}>{this.state.temp}</Text>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  text: {
    color: 'grey',
    fontSize: 18,
  },
  container: {
    position: "absolute",
    width: 40,
    height: 70,
    top: 100,
    right: 15,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    marginBottom: 700,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.09,
    shadowRadius: 4.65,
    elevation: 1,
  }
})

export default WeatherIcon