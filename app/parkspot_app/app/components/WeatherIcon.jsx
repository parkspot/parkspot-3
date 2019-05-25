//React dependencies
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
//Styles

class WeatherIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource:[]
     };
   }

   componentDidMount(){
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
       loading: false,
       dataSource: responseJson
      })
    })
    .catch(error=>console.log(error)) //to catch the errors if any
    }

  render() {
    //console.log(this.state.dataSource)
    return (
      <View style={styles.container}>
        <Image
          style={{width: 40, height: 40}}
          source={require('../assets/sun.png')}
        />
        <Text style={styles.text}>13°</Text>
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
    width: 40,
    height: 70,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    marginRight: 10,
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