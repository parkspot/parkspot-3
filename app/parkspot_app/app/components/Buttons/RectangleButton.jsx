import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

class RectangleButton extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <TouchableOpacity style={styles.rectangleButtonContainer} title={this.props.title} onPress={() => {}}>
                <Text style={styles.text}> Search </Text>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    rectangleButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "60%",
        height: 50,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 7,
    },
    text: {
        color: "#FFF",
        fontSize: 18
    }
});
export default RectangleButton