/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    View,
    FlatList,
} from 'react-native';
import DateCheckView from "../../../Component/DateCheckView";
import TypeCheckView from "../../../Component/TypeCheckView";
import InputView from "../../../Component/InputView";
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {Toast} from 'teaset';
import Echarts from 'native-echarts';
import ElectricItem from "../../../Component/item/ElectricItem";
import ElectricDayItem from "../../../Component/item/ElectricDayItem";
import ChartEmptyView from "../../../Component/ChartEmptyView";
import LoadingView from "../../../Component/LoadingView";
import RenewableItem from "../../../Component/item/RenewableItem";

type Props = {};
export default class RenewableFragment extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            showPie: false,
            date_type: 1,
            type: 0,
            date: '2018-08-04',
            isVisible: false,
            table_data: [],
            option: {},
            pieOption: {},
            isRefreshing: false,
            tableRatio: '',
            empty: false,
            isLoading: false,
        }
    }

    render() {
        let bar = this.state.empty === false ? <Echarts option={this.state.option} height={300}/> : <ChartEmptyView/>;
        let pie = this.state.showPie && this.state.empty === false ?
            <Echarts option={this.state.pieOption} height={300}/> : <View/>;
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
                        {pie}
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
                    <View style={{flex: 1}}/>
                </View>
                <DateTimePicker
                    isVisible={this.state.isVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateCancelPicker}
                    mode={'date'}
                    maximumDate={new Date()}
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

    _renderItem({item}) {
        let view = this.state.date_type === 2 ? <ElectricDayItem data={item} ratio={this.state.tableRatio}/> :
            <RenewableItem data={item} ratio={this.state.tableRatio}/>
        return (
            <View>
                {view}
            </View>
        );
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        this._sendRequest(this.state);
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
        let date_type = data.date_type === 1 ? 'month' : data.date_type === 0 ? 'year' : 'date';
        let title = data.date_type === 0 ? `${moment(data.date).format("YYYY年")} 区间发电量柱状图` : data.date_type === 1
            ? `${moment(data.date).format("YYYY年MM月")} 区间发电量柱状图`
            : `${moment(data.date).format("YYYY年MM月DD日")} 区间发电量曲线图`;
        storage
            .load({key: 'loginState'})
            .then((loginState) => {
                Api.setToken(loginState.token)
                    .get('/api/renewable/usage', {date_type, time: data.date})
                    .then((data) => {
                        let ratio = `${data.ratio ? data.ratio : data.chart_ratio}${loginState.unit.power}`;
                        let barData = data.chart_type == "bar" ?
                            [
                                {
                                    name: '发电量',
                                    type: 'bar',
                                    stack: '发电',
                                    data: data.chart.map((item) => {
                                        return {
                                            value: item,
                                            name: ratio
                                        };
                                    }),
                                    color: ['#3ea5f3'],
                                },
                            ]
                            : [{
                                name: '发电量',
                                type: 'line',
                                step: 'end',
                                color: ["rgb(70, 140, 200)"],
                                markArea: {
                                    data: data.mark_area,

                                },
                                data: data.chart.map((item) => {
                                    return {
                                        value: item,
                                        name: ratio
                                    };
                                }),
                            }];

                        this.setState({
                            empty: data.table_data.length < 1,
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
                            showPie: data.peak_valley_pie && data.peak_valley_pie.length > 0,
                            pieOption: {
                                title: {
                                    text: '当日区间用电量排行占比图',
                                    x: 'center',

                                },
                                tooltip: {
                                    trigger: 'item',
                                    confine: true,
                                },
                                legend: {
                                    type: 'scroll',
                                    orient: 'vertical',
                                    top: 'middle',
                                    right: '5px',
                                    data: data.legend

                                    //selected: data.selected
                                },
                                color: ['rgb(255,136,3)', 'rgb(95,183,96)', 'rgb(70,140,200)'],
                                series: [
                                    {
                                        name: '当日能耗',
                                        type: 'pie',
                                        radius: '60%',
                                        center: ['40%', '50%'],
                                        data: data.peak_valley_pie,
                                        label: {
                                            normal: {
                                                show: false
                                            },
                                        },
                                        itemStyle: {
                                            emphasis: {
                                                shadowBlur: 5,
                                                shadowOffsetX: 0,
                                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                                            }
                                        }
                                    }
                                ]
                            },
                            isRefreshing: false,
                            isLoading: false,
                            tableRatio: `(${data.ratio ? data.ratio : data.chart_ratio}${loginState.unit.power})`
                        });
                    })
                    .catch((error) => {
                        this.setState({isRefreshing: false, isLoading: false});
                        Toast.message(error.response)
                    });
            });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
