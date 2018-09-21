/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ActivityIndicator
} from 'react-native';

type Props = {};
export default class FootView extends Component<Props> {
    render() {
        if (this.props.showFoot === 1) {
            return (
                <View style={{height: 40, alignItems: 'center', justifyContent: 'center',}}>
                    <Text style={{color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5,}}>
                        已加载全部数据
                    </Text>
                </View>
            );
        } else if (this.props.showFoot === 2) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator/>
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.footer}>
                    <Text></Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.tab_background,
    },
    footer:{
        flexDirection:'row',
        height:60,
        justifyContent:'center',
        alignItems:'center',
    },
});
