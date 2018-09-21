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
import ElectricFragment from "./fragment/ElectricFragment";
import ElectricRankFragment from "./fragment/ElectricRankFragment";

type Props = {};

export default class ElectricPage extends Component<Props> {

    render() {
        return (
            <SegmentedView style={{flex: 1}}
                           type='projector'
                           indicatorLineColor={Color.tab_text_color1}
                           barStyle={{height: 45, borderBottomWidth: 0.5, borderColor: Color.line}}>
                <SegmentedView.Sheet title='区间用电量'
                                     activeTitleStyle={{color: Color.tab_text_color1}}>
                    <ElectricFragment/>
                </SegmentedView.Sheet>
                <SegmentedView.Sheet title='耗电排行'
                                     activeTitleStyle={{color: Color.tab_text_color1}}>
                    <ElectricRankFragment/>
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
