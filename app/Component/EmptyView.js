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
    ActivityIndicator,
    Dimensions
} from 'react-native';

type Props = {};
const {height} = Dimensions.get('window');
export default class EmptyView extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Text>暂无数据</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: Color.tab_background,
        paddingTop: 20
    }
});
