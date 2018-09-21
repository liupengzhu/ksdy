import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default class RenewableRankItem extends Component {

    render() {
        let {
            history_average,
            range,
            rank,
            total_generated,
            company_name,
            installed_capacity,
        } = this.props.data;
        let ratio = this.props.ratio;
        let source = range == '/' || range == null ? Images.None : range > 0 ? Images.Rise : Images.Decline;
        let imageSource = rank === 1 ? Images.Top1 : rank === 2 ? Images.Top2 : rank === 3 ? Images.Top3 : Images.Top4;
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Image source={imageSource} style={{width: 15, height: 15}}/>
                    <Text style={styles.titleText}>发电排行{rank}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemKey}>企业名称</Text>
                    <Text
                        style={styles.itemValue}>{company_name}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemKey}>装机容量(kVA)</Text>
                    <Text
                        style={styles.itemValue}>
                        {installed_capacity == "/" || installed_capacity == null ? "-" : parseInt(installed_capacity).toFixed(2)}
                    </Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemKey}>实际发电量{ratio}</Text>
                    <Text
                        style={styles.itemValue}>
                        {total_generated == "/" || total_generated == null ? "-" : total_generated.toFixed(2)}
                    </Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemKey}>历史同期发电量{ratio}</Text>
                    <Text
                        style={styles.itemValue}>
                        {history_average == "/" || history_average == null ? "-" : history_average.toFixed(2)}
                    </Text>
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
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
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