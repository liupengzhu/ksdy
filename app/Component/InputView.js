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
    Image,
    TouchableOpacity
} from 'react-native';

type Props = {};
export default class InputView extends Component<Props> {
    render() {
        return (
            <TouchableOpacity activeOpacity={0.5} style={{flex: 1}} onPress={this.props.onPress}>
                <View style={styles.input}>
                    <Text style={styles.textStyle}>{this.props.date}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.tab_background,
    }, input: {
        borderWidth: 0.5,
        marginLeft: 5,
        marginRight: 5,
        borderColor: Color.line,
        borderRadius: 5,
        flex: 1,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        color: Color.home_text_l,
        fontSize: 10
    }
});
