import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default class ElectricRankItem extends Component {

    render() {
        let {
            name,
            data,
            percent
        } = this.props.data;
        let ratio = this.props.ratio;
        let index = this.props.index + 1;
        let type = this.props.type === 'company' ? '企业' : '行业';
        let imageSource = index === 1 ? Images.Top1 : index === 2 ? Images.Top2 : index === 3 ? Images.Top3 : Images.Top4;
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Image source={imageSource} style={{width: 15, height: 15}}/>
                    <Text style={styles.titleText}>耗电排行{index}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemKey}>{type}名称：</Text>
                    <Text style={styles.itemValue}>{name}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemKey}>{type}能耗：</Text>
                    <Text
                        style={styles.itemValue}>{data ? (data === '0' ? '0.00' : data.toFixed(2)) + ratio : '-'}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemKey}>{type}占比：</Text>
                    <Text style={styles.itemValue}>{percent.toFixed(2)}%</Text>
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
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 15,
        marginLeft: 5,
    },
    item: {
        flexDirection: 'row',
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