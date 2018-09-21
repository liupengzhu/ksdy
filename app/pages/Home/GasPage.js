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
import GasFragment from "./fragment/GasFragment";
import GasRankFragment from "./fragment/GasRankFragment";

type Props = {};
export default class GasPage extends Component<Props> {
    render() {
        return (
            <SegmentedView style={{flex: 1}}
                           type='projector'
                           indicatorLineColor={Color.tab_text_color1}
                           barStyle={{height: 45, borderBottomWidth: 0.5, borderColor: Color.line}}>
                <SegmentedView.Sheet title='区间用气量'
                                     activeTitleStyle={{color: Color.tab_text_color1}}>
                    <GasFragment/>
                </SegmentedView.Sheet>
                <SegmentedView.Sheet title='耗气排行'
                                     activeTitleStyle={{color: Color.tab_text_color1}}>
                    <GasRankFragment/>
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
