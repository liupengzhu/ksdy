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
export default class ChartEmptyView extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Text>正在测试</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        height: 300,
    }
});
