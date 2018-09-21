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
import RenewableFragment from "./fragment/RenewableFragment";
import RenewableRankFragment from "./fragment/RenewableRankFragment";

type Props = {};
export default class RenewablePage extends Component<Props> {
    render() {
        return (
            <SegmentedView style={{flex: 1}}
                           type='projector'
                           indicatorLineColor={Color.tab_text_color1}
                           barStyle={{height: 45, borderBottomWidth: 0.5, borderColor: Color.line}}>
                <SegmentedView.Sheet title='区间发电量'
                                     activeTitleStyle={{color: Color.tab_text_color1}}>
                    <RenewableFragment/>
                </SegmentedView.Sheet>
                <SegmentedView.Sheet title='发电排行'
                                     activeTitleStyle={{color: Color.tab_text_color1}}>
                    <RenewableRankFragment/>
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
