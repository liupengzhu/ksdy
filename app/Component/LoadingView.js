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
export default class LoadingView extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    animating={true}
                    color={Color.tab_text_color2}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Color.tab_background,
        paddingTop:20
    }
});
