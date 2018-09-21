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
export default class HeaderView extends Component<Props> {
    render() {

        return (
            <View style={styles.header}>
                <ActivityIndicator/>
                <Text>正在刷新...</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    header: {
        flexDirection: 'row',
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
});
