import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Slider, Switch } from 'react-native'
import { SwipeUpContainer } from './Containers'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import QuickPicker from 'quick-picker';
import SnapSlider from 'react-native-snap-slider';
import { Title } from './Texts/';

import RectangleButton from './Buttons/RectangleButton';

class Preferences extends Component {
    constructor(props) {
        super(props);
        this.prefElement = React.createRef();
        this.state = {
            zone : "Underground Parking",
            price : "0",
            distance: "0",
            distanceOptions: [
                {value: 100, label: "<100m"},
                {value: 300, label: "300m"},
                {value: 700, label: "700m"},
                {value: 1000, label: ">1km"},
            ],
            priceOptions: [
                {value: 1, label: "<€1"},
                {value: 2, label: "€2"},
                {value: 5, label: "€5"},
                {value: 10, label: "€10"},
            ],
            bancontact: false,
            avoidLez: false,
            avoidUnderground: false,
        }
    }

    _onPressButton = () => {
        QuickPicker.open({ 
            items: ['Underground parking', 'Park & Ride', 'City', 'Edge of city', 'Outside city'],
            selectedValue: this.state.zone, // this could be this.state.selectedLetter as well.
            onValueChange: (selectedValueFromPicker) => this.setState({ zone: selectedValueFromPicker }),
        });
    }

    round = (float) => {
        return Math.round(float * 100) / 100
    }

    searchHandler = () => {
        this.props.searchHandler()
        this.prefElement.current.ClosePanel()
    }

    showPrefPanel = () => {
        this.prefElement.current.ShowPanel()
    }

    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };
        return (

            <View style={styles.container}>

                <GestureRecognizer style={styles.swipeContainer} config={config} onSwipeUp={() => this.prefElement.current.ShowPanel()}>

                </GestureRecognizer>
                < SwipeUpContainer ref={this.prefElement} height={this.props.height} titleText={"Preferences"} >
                        <View style={styles.listItemContainer_normal}>
                            <View style={styles.listItemRowContainer}>
                                <Text style={styles.item} >Zone</Text>
                                <TouchableOpacity onPress={this._onPressButton}><Text style={styles.value}>{this.state.zone} </Text></TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.listItemContainer_large}>
                            <View style={styles.listItemRowContainer}>
                                <Text style={styles.item} >Price/hour</Text>
                                <SnapSlider ref="slider" containerStyle={styles.snapsliderContainer} style={{width: 200, height: 40}}
                                    itemWrapperStyle={{padding: 0}}
                                    itemStyle={styles.snapsliderItem}
                                    items={this.state.priceOptions}
                                    labelPosition="top"
                                    defaultItem={0}
                                    onSlidingComplete={(value) => this.setState({ price: value })}/>
                            </View>
                        </View>

                        <View style={styles.listItemContainer_large}>
                            <View style={styles.listItemRowContainer}>
                                <Text style={styles.item} >Distance from destination</Text>
                                <SnapSlider ref="slider" containerStyle={styles.snapsliderContainer} style={{width: 200, height: 40}}
                                    itemWrapperStyle={{padding: 0}}
                                    itemStyle={styles.snapsliderItem}
                                    items={this.state.distanceOptions}
                                    labelPosition="top"
                                    defaultItem={0}
                                    onSlidingComplete={(value) => this.setState({ distance: value })}/>
                            </View>
                        </View>

                        <View style={styles.lastItemContainer}>
                            <View style={styles.listItemRowContainer}>
                                <Text style={styles.item} >Bancontact</Text>
                                <Switch onValueChange = {(value) => this.setState({ bancontact: value })} value = {this.state.bancontact} />
                            </View>
                        </View>

                        <Title text={"Avoid"} />

                        <View style={styles.listItemContainer_normal}>
                            <View style={styles.listItemRowContainer}>
                                <Text style={styles.item} >Low Emission Zone</Text>
                                <Switch onValueChange = {(value) => this.setState({ avoidLez: value })} value = {this.state.avoidLez} />
                            </View>
                        </View>

                        <View style={styles.lastItemContainer}>
                            <View style={styles.listItemRowContainer}>
                                <Text style={styles.item} >Underground parking</Text>
                                <Switch onValueChange = {(value) => this.setState({ avoidUnderground: value })} value = {this.state.avoidUnderground} />
                            </View>
                        </View>

                        <RectangleButton color={["#4CD964", "#46CA5D"]} onPress={this.searchHandler}/>

                        <QuickPicker />
                </SwipeUpContainer>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    item: {
    },
    value: {
        color: "#007FFF",
    },
    listItemContainer_normal: {
        width:"100%",
        height:60,
        borderColor: 'rgba(112, 112, 112, 0.2)',
        borderTopWidth: 1,
    },
    listItemContainer_large: {
        width:"100%",
        height:80,
        borderColor: 'rgba(112, 112, 112, 0.2)',
        borderTopWidth: 1,
    },
    lastItemContainer: {
        width:"100%",
        height:60,
        borderColor: 'rgba(112, 112, 112, 0.2)',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginBottom: 30,
    },
    listItemRowContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
    },
    swipeContainer: {
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 400,
        height: 70,

    },
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});


export default Preferences