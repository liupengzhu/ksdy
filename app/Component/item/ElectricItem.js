import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default class ElectricItem extends Component {

    render() {
        let {
            history_average, normal,
            peak,
            range,
            rush,
            time,
            total,
            valley
        } = this.props.data;
        let ratio = this.props.ratio;
        let source = range == '/' || range == null ? Images.None : range > 0 ? Images.Rise : Images.Decline;
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{time}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemKey}>尖{ratio}</Text>
                    <Text style={styles.itemValue}>{rush == "/" || rush == null ? "-" : rush.toFixed(2)}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemKey}>峰{ratio}</Text>
                    <Text style={styles.itemValue}>{peak == "/" || peak == null ? "-" : peak.toFixed(2)}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemKey}>平{ratio}</Text>
                    <Text style={styles.itemValue}>{normal == "/" || normal == null ? "-" : normal.toFixed(2)}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemKey}>谷{ratio}</Text>
                    <Text style={styles.itemValue}>{valley == "/" || valley == null ? "-" : valley.toFixed(2)}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemKey}>区间用电量{ratio}</Text>
                    <Text style={styles.itemValue}>{total == "/" || total == null ? "-" : total.toFixed(2)}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemKey}>同期历史值{ratio}</Text>
                    <Text
                        style={styles.itemValue}>{history_average == "/" || history_average == null ? "-" : history_average.toFixed(2)}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemKey}>增幅(%)</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={{width: 12, height: 12, marginRight: 7}} source={source}/>
                        <Text style={styles.itemValue}>{range == "/" || range == null ? "-" : range.toFixed(2)}</Text>
                    </View>
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