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
    View
} from 'react-native';
import SegmentedView from "teaset/components/SegmentedView/SegmentedView";
import Label from "teaset/components/Label/Label";
import SteamFragment from "./fragment/SteamFragment";
import SteamRankFragment from "./fragment/SteamRankFragment";

type Props = {};
export default class SteamPage extends Component<Props> {
    render() {
        return (
            <SegmentedView style={{flex: 1}}
                           type='projector'
                           indicatorLineColor={Color.tab_text_color1}
                           barStyle={{height: 45, borderBottomWidth: 0.5, borderColor: Color.line}}>
                <SegmentedView.Sheet title='区间用汽量'
                                     activeTitleStyle={{color: Color.tab_text_color1}}>
                    <SteamFragment/>
                </SegmentedView.Sheet>
                <SegmentedView.Sheet title='耗汽排行'
                                     activeTitleStyle={{color: Color.tab_text_color1}}>
                    <SteamRankFragment/>
                </SegmentedView.Sheet>
            </SegmentedView>
        );
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
