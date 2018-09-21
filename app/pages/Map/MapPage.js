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
    TouchableOpacity
} from 'react-native';

type Props = {};
export default class MapPage extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.5}
                                  onPress={() => {
                                      this._onPress()
                                  }}>
                    <Text style={styles.welcome}>
                        Welcome to React Native!
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }

    _onPress() {
        Actions.mainPage();
    }


    componentDidMount() {
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
