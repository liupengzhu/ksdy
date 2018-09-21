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
    Dimensions
} from 'react-native';

const {width} = Dimensions.get('window');
type Props = {};
export default class ItemSeparatorLine extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:width,
        height:1.5,
        backgroundColor:Color.line
    }
});
