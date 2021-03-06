/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    FlatList,
    RefreshControl,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import DateCheckView from "../../../Component/DateCheckView";
import TypeCheckView from "../../../Component/TypeCheckView";
import InputView from "../../../Component/InputView";
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {Toast} from "teaset";
import ChartEmptyView from "../../../Component/ChartEmptyView";
import Echarts from "native-echarts";
import SteamItem from "../../../Component/item/SteamItem";
import LoadingView from "../../../Component/LoadingView";

type Props = {};
export default class SteamFragment extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            date_type: 1,
            type: 0,
            date: '2018-08-04',
            isVisible: false,
            table_data: [],
            option: {},
            isRefreshing: false,
            tableRatio: '',
            empty: false,
            isLoading: false,
        }
    }

    render() {
        let bar = this.state.empty === false ? <Echarts option={this.state.option} height={300}/> : <ChartEmptyView/>;
        let view = this.state.isLoading ? <LoadingView/> :
            <View style={{flex: 1, backgroundColor: Color.tab_background}}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            progressBackgroundColor="#ffffff"
                        />
                    }
                >
                    <View style={{backgroundColor: 'white'}}>
                        {bar}
                    </View>
                    <FlatList
                        data={this.state.table_data}
                        renderItem={this._renderItem.bind(this)}
                    />

                </ScrollView>
            </View>;
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <DateCheckView
                        hideDay={true}
                        onChange={(checkedId) => {
                            this._onChange(checkedId);
                        }}/>
                    <InputView date={this.state.date} onPress={() => {
                        this._onPress();
                    }}/>
                    <TypeCheckView
                        onChange={(checkedId) => {
                            this._onTypeChange(checkedId);
                        }}/>
                </View>
                <DateTimePicker
                    isVisible={this.state.isVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateCancelPicker}
                    maximumDate={new Date()}
                    mode={'date'}
                    cancelTextIOS={'取消'}
                    confirmTextIOS={'确认'}
                    titleIOS={'请选择日期'}
                />
                {view}
            </View>
        );
    }

    componentWillMount() {
        this.setState({date: moment().format("YYYY-MM"), isLoading: true});
    }

    componentDidMount() {
        this._sendRequest(this.state);
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        this._sendRequest(this.state);
    }

    _renderItem({item}) {
        return (
            <SteamItem data={item} ratio={this.state.tableRatio}/>
        );
    }

    _onChange(date_type) {
        this.setState({date_type});
        switch (date_type) {
            case 0:
                this.setState({date: moment().format("YYYY"), isVisible: false});
                this._sendRequest({...this.state, date: moment().format("YYYY"), isVisible: false, date_type});
                break;
            case 1:
                this.setState({date: moment().format("YYYY-MM"), isVisible: false});
                this._sendRequest({...this.state, date: moment().format("YYYY-MM"), isVisible: false, date_type});
                break;
            case 2:
                this.setState({date: moment().format("YYYY-MM-DD"), isVisible: false});
                this._sendRequest({...this.state, date: moment().format("YYYY-MM-DD"), isVisible: false, date_type});
                break;
            default:
                break;
        }
    }

    _onTypeChange(type) {
        this.setState({type});
        this._sendRequest({...this.state, type});
    }

    _onPress() {
        this.setState({isVisible: true});
    }

    _handleDatePicked = (date) => {
        switch (this.state.date_type) {
            case 0:
                this.setState({date: moment(date).format("YYYY"), isVisible: false});
                this._sendRequest({...this.state, date: moment(date).format("YYYY"), isVisible: false});
                break;
            case 1:
                this.setState({date: moment(date).format("YYYY-MM"), isVisible: false});
                this._sendRequest({...this.state, date: moment(date).format("YYYY-MM"), isVisible: false});
                break;
            case 2:
                this.setState({date: moment(date).format("YYYY-MM-DD"), isVisible: false});
                this._sendRequest({...this.state, date: moment(date).format("YYYY-MM-DD"), isVisible: false});
                break;
            default:
                break;
        }


    };

    _hideDateCancelPicker = () => {
        this.setState({isVisible: false});
    };

    _sendRequest(data) {
        let date_type = data.date_type === 1 ? 'month' : 'year';
        let type = data.type === 1 ? 'fold' : 'original';
        let title = data.date_type === 0 ? `${moment(data.date).format("YYYY年")} 区间用汽量柱状图` :
            `${moment(data.date).format("YYYY年MM月")} 区间用汽量柱状图`
        let isFold = data.type === 1;
        storage
            .load({key: 'loginState'})
            .then((loginState) => {
                Api.setToken(loginState.token)
                    .get('/api/steam/usage', {date_type, type, time: data.date})
                    .then((data) => {
                        let ratio = isFold ? 'tce'
                            : `${loginState.unit.steam_usage}`;
                        let barData = [
                            {
                                name: '用汽量',
                                type: 'bar',
                                stack: '用汽',
                                data: data.chart.map((item) => {
                                    return {
                                        value: item,
                                        name: ratio
                                    };
                                }),
                                color: ['#3ea5f3'],
                            }

                        ];

                        this.setState({
                            empty: data.chart && data.chart.length < 1,
                            table_data: data.table_data,
                            option: {
                                title: {
                                    text: title,
                                    x: 'center',
                                    y: 10,
                                },
                                xAxis: [
                                    {

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
                                                formatter: `{value}${ratio}`,//格式化y轴数据

                                            },
                                        }
                                    ],

                                series: barData,
                                grid: {
                                    top: data.chart_type == "bar" ? '15%' : '20%',
                                    left: '3%',
                                    containLabel: true,
                                    right:'3%',
                                },
                                tooltip: {
                                    trigger: 'axis',
                                    confine: true,
                                    axisPointer:
                                        {            // 坐标轴指示器，坐标轴触发有效
                                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                        },
                                    formatter(params, ticket, callback) {
                                        params.reverse();
                                        let res = '<p  style="margin: 0px; ">时间：'
                                            + (params.length > 1 ? params[1].name : params[0].name) + '</p>';
                                        let total = 0;
                                        for (let i = 0; i < params.length; i++) {
                                            if (params[i].data.value != null) {
                                                res += '<p style="margin: 0px; "><span style="color:' + params[i].color
                                                    + '">' + params[i].seriesName + '</span><span>： '
                                                    + params[i].data.value.toFixed(2)
                                                    + params[i].data.name
                                                    + '</span></p>';
                                                total += params[i].data.value;
                                            }
                                        }
                                        if (params.length > 1) {
                                            res += '<p style="margin: 0px; ">' + '总量' + '： '
                                                + total.toFixed(2)
                                                + params[1].data.name
                                                + '</p>';
                                        }
                                        if (total == 0) {
                                            return null;
                                        }
                                        return res;
                                    }
                                },
                            },
                            isRefreshing: false,
                            tableRatio: `(${ratio})`,
                            isLoading: false,
                        });
                    })
                    .catch((error) => {
                        this.setState({
                            isRefreshing: false,
                            isLoading: false,
                        });
                        Toast.message(error.response)
                    });
            });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: Color.line,
        borderBottomWidth: 0.5,
    },

});
