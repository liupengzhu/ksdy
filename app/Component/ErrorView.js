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
export default class ErrorView extends Component<Props> {
    render() {
        return (
            <TouchableOpacity activeOpacity={0.5}
                              style={styles.container}
                              onPress={this.props.errorOnPress}
            >
                <View style={styles.container}>
                    <Image style={{width: 150, height: 150}}
                           source={require('../Image/loading_error.png')}
                    />
                    <Text style={{color: color.text_n,marginTop:20}}>网络连接异常，点击刷新</Text>
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
    }
});
