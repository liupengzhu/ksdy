/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
} from 'react-native';
import SegmentedView from "teaset/components/SegmentedView/SegmentedView";
import CarbonFragment from "./fragment/CarbonFragment";
import CarbonRankFragment from "./fragment/CarbonRankFragment";

type Props = {};
export default class CarbonPage extends Component<Props> {
    render() {
        return (
            <SegmentedView style={{flex: 1}}
                           type='projector'
                           indicatorLineColor={Color.tab_text_color1}
                           barStyle={{height: 45, borderBottomWidth: 0.5, borderColor: Color.line}}>
                <SegmentedView.Sheet title='实际排放量'
                                     activeTitleStyle={{color: Color.tab_text_color1}}>
                    <CarbonFragment/>
                </SegmentedView.Sheet>
                <SegmentedView.Sheet title='排放量排行'
                                     activeTitleStyle={{color: Color.tab_text_color1}}>
                    <CarbonRankFragment/>
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
