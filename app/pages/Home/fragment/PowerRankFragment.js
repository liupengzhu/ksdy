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
export default class PowerRankFragment extends Component<Props> {
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
        let title = '当月企业能耗排行Top10';
        storage.load({key: 'loginState'})
            .then((loginState) => {
                Api.setToken(loginState.token)
                    .get('/api/home/company_energy')
                    .then((data) => {
                        let unit = loginState.unit.energy_usage;
                        let datas = data.data.reverse();
                        let names = data.name.reverse();
                        this.setState({
                            isLoading: false,
                            empty: data.data.length < 1,
                            option: {
                                title: {
                                    text: title,
                                    x: 'center',
                                    align: 'right',
                                    y: 10,
                                },
                                grid: {
                                    top: '15%',
                                    left:
                                        '3%',
                                    right:
                                        '5%',
                                    bottom:
                                        '10%',
                                    containLabel:
                                        true
                                },
                                tooltip: {
                                    trigger: 'axis',
                                    confine: true,
                                    position: function (point, params, dom, rect, size) {
                                        return ['5%', point[1] + 10];
                                    },
                                    axisPointer:
                                        {
                                            type: 'shadow'
                                        }
                                    ,
                                    formatter(params, ticket, callback) {
                                        params.splice(0, 1);
                                        var total = 0;
                                        var res = '<p style="margin:0px">企业名称：' + params[0].name + '</p>';
                                        for (var i = 0; i < params.length; i++) {
                                            if (params[i].data != null) {
                                                res += '<p style="margin: 0px"><span>' + params[i].seriesName
                                                    + '</span><span>： ' + params[i].data.value.toFixed(2)
                                                    + params[i].data.name + '</span></p>';
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
                                xAxis: [
                                    {
                                        type: 'value',

                                    }
                                ],
                                yAxis:
                                    {
                                        axisTick: {
                                            show: false
                                        }
                                        ,
                                        axisLine: {
                                            show: false
                                        }
                                        ,
                                        data: names,
                                        axisLabel:
                                            {
                                                formatter: function () {
                                                    return "";
                                                }
                                            }
                                    }
                                ,
                                series: [
                                    {
                                        type: 'bar',
                                        itemStyle: {
                                            normal: {color: 'rgba(0, 0, 0, 0)'}
                                        },
                                        barGap: '-100%',
                                        data: datas,
                                        animation: false,
                                    },
                                    {
                                        name: '企业能耗',
                                        type: 'bar',
                                        data: datas.map((item) => {
                                            return {
                                                value: item,
                                                name: unit,
                                            };
                                        }),
                                        label: {
                                            normal: {
                                                show: true,
                                                position: 'insideLeft',
                                                color: '#000',
                                                textBorderColor: 'rgba(225, 225, 225, .9)',
                                                textBorderWidth: 2,
                                                textShadowBlur: 2,
                                                formatter(params, ticket, callback) {
                                                    return params.name;
                                                },
                                            }
                                        },
                                        itemStyle: {
                                            normal: {
                                                color: function (params) {
                                                    var colorList = [
                                                        '#ffdcd2', '#ffc7b7', '#ffb39e', '#fd9f85', '#f78c6e',
                                                        '#ed7a5a', '#e16f4f', '#d25c3b', '#c44b29', '#b83915',
                                                        //色彩保留备用
                                                        // '#fcced0', '#ffb2ae', '#ff9693', '#ff8682', '#ff6f6a',
                                                        // '#ff5d50', '#f04038', '#d72624', '#c61817', '#ad1211',
                                                    ];
                                                    return colorList[params.dataIndex]
                                                },
                                            }
                                        },

                                    },
                                ]

                            },

                        });
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
        marginBottom: 10,
    },

});
