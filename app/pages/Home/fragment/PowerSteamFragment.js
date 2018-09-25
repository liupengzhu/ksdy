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
import Echarts from 'native-echarts';
import {Toast} from "teaset";
import LoadingView from "../../../Component/LoadingView";
import ChartEmptyView from "../../../Component/ChartEmptyView";

type Props = {};
export default class PowerSteamFragment extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            option: {},
            isLoading: false,
            empty: false,

        };
    }

    render() {
        let content = this.state.isLoading ? <LoadingView/> :
            this.state.empty ?
                <ChartEmptyView/> :
                <Echarts option={this.state.option} height={300}/>;
        return (
            <View style={[styles.container, this.props.styles]}>
                {content}
            </View>
        );
    }

    componentDidMount() {
        this.setState({isLoading: true});
        this._sendRequest();
    }

    _sendRequest() {
        let title = '当月用蒸汽量柱状图';
        storage.load({key: 'loginState'})
            .then((loginState) => {
                Api.setToken(loginState.token)
                    .get('/api/home/steam_usage')
                    .then((data) => {
                        let unit = loginState.unit.steam_usage;
                        this.setState({
                            isLoading: false,
                            empty: data.series.length < 1,
                            option: {
                                title: {
                                    text: title,
                                    x: 'center',
                                    align: 'right',
                                    y: 10,
                                },
                                tooltip: {
                                    trigger: 'axis',
                                    confine: true,
                                    axisPointer:
                                        {            // 坐标轴指示器，坐标轴触发有效
                                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                        }
                                    ,
                                    formatter(params, ticket, callback) {
                                        params.reverse();
                                        var total = 0;
                                        var res = '<p style="margin:0px">时间：' + params[0].name + '</p>';
                                        for (var i = 0; i < params.length; i++) {
                                            if (params[i].data != null) {
                                                res += '<p style="margin: 0px"><span style="color:' + params[i].color +
                                                    '">' + params[i].seriesName + '</span><span>： '
                                                    + params[i].data.value.toFixed(2) + params[i].data.name + '</span></p>';
                                                total = params[i].data.value;
                                            }
                                        }

                                        if (total == 0) {
                                            return null;
                                        }
                                        return res;

                                    }

                                }
                                ,

                                grid: {
                                    left: '3%',
                                    right: '4%',
                                    top: '15%',
                                    bottom: '10%',
                                    containLabel: true
                                }
                                ,
                                xAxis: [
                                    {

                                        axisLabel: { //调整x轴的lable

                                        },
                                        type: 'category',
                                        data: data.x_name,
                                        axisTick: {
                                            alignWithLabel: true
                                        },
                                        max: data.x_name.length - 1,
                                        min: 0,
                                        interval: 10
                                    }
                                ],
                                yAxis:
                                    [
                                        {
                                            type: 'value',
                                            axisLabel: { //调整x轴的lable

                                                formatter: `{value}${unit}`,

                                            }
                                        }
                                    ],

                                series: [
                                    {
                                        name: '用汽量',
                                        type: 'bar',
                                        stack: '用汽',
                                        data: data.series.map((item) => {
                                            return {
                                                value: item,
                                                name: unit,
                                            };
                                        }),
                                        color: ['#fdb12e'],
                                    }

                                ],

                            },

                        })
                        ;
                    })
                    .catch((error) => {
                        this.setState({
                            isLoading: false,
                        });
                        Toast.message(error.response);
                    });
            })
            .catch();
    }
}

const styles = StyleSheet.create({
    container: {
        height: 300,
        backgroundColor: 'white',
        marginTop: 10,
    },

});
