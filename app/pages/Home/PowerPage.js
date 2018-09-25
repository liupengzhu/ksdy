/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import PowerElectricFragment from "./fragment/PowerElectricFragment";
import PowerRenewableFragment from "./fragment/PowerRenewableFragment";
import PowerWaterFragment from "./fragment/PowerWaterFragment";
import PowerSteamFragment from "./fragment/PowerSteamFragment";
import PowerGasFragment from "./fragment/PowerGasFragment";
import PowerRankFragment from "./fragment/PowerRankFragment";

type Props = {};
export default class PowerPage extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <PowerElectricFragment/>
                    <PowerRenewableFragment/>
                    <PowerWaterFragment/>
                    <PowerSteamFragment/>
                    <PowerGasFragment/>
                    <PowerRankFragment/>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.tab_background,
    },

});
