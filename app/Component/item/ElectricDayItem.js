import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default class ElectricDayItem extends Component {

    render() {
        let {
            time,
            value
        } = this.props.data;
        let ratio = this.props.ratio;
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{time}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemKey}>区间用电量{ratio}</Text>
                    <Text style={styles.itemValue}>{value == "/" || value == null ? "-" : value.toFixed(2)}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginTop: 10,
        paddingBottom: 5,
    },
    title: {
        borderBottomWidth: 0.5,
        borderColor: Color.line,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15
    },
    titleText: {
        fontSize: 15,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5
    },
    itemKey: {
        color: Color.home_text_l,
    },
    itemValue: {}
});