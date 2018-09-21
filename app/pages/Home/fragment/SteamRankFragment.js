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
import Echarts from 'native-echarts';
import {Toast} from 'teaset';
import RankTypeView from "../../../Component/RankTypeView";
import ChartEmptyView from "../../../Component/ChartEmptyView";
import SteamRankItem from "../../../Component/item/SteamRankItem";
import LoadingView from "../../../Component/LoadingView";

type Props = {};
export default class SteamRankFragment extends Component<Props> {
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
            ratio: '',
            rank_type: 'company',
            empty: false,
            isLoading: false,
        }
    }

    render() {
        let chart = this.state.empty === false ?
            <Echarts option={this.state.option} height={280}/> : <ChartEmptyView/>;
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
                        {chart}
                    </View>
                    <FlatList
                        data={this.state.table_data}
                        renderItem={this._renderItem.bind(this)}
                        style={{paddingBottom: 40}}
                    />
                </ScrollView>
                <View style={styles.typeStyle}>
                    <RankTypeView onChange={(type) => {
                        this._onRankTypeChange(type);
                    }}/>
                </View>
            </View>;
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <DateCheckView
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
                    mode={'date'}
                    maximumDate={new Date(new Date().valueOf() - 1000 * 60 * 60 * 24)}
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

    _renderItem({item, index}) {
        return (
            <SteamRankItem
                data={item}
                ratio={this.state.ratio}
                index={index}
                type={this.state.rank_type}/>
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
                this.setState({
                    date: moment((new Date().valueOf() - 1000 * 60 * 60 * 24)).format("YYYY-MM-DD"),
                    isVisible: false
                });
                this._sendRequest({
                    ...this.state,
                    date: moment((new Date().valueOf() - 1000 * 60 * 60 * 24)).format("YYYY-MM-DD"),
                    isVisible: false,
                    date_type
                });
                break;
            default:
                break;
        }
    }

    _onRankTypeChange(type) {
        this.setState({rank_type: type});
        this._sendRequest({...this.state, rank_type: type});
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
        let date_type = data.date_type === 1 ? 'month' : data.date_type === 0 ? 'year' : 'date';
        let type = data.type === 1 ? 'fold' : 'original';
        let titleType = data.rank_type === 'company' ? '企业' : '行业';
        let title = data.date_type === 0 ? `${moment(data.date).format("YYYY年")} ${titleType}耗汽排行占比图` : data.date_type === 1
            ? `${moment(data.date).format("YYYY年MM月")} ${titleType}耗汽排行占比图`
            : `${moment(data.date).format("YYYY年MM月DD日")} ${titleType}耗汽排行占比图`;
        let isFold = data.type === 1;
        let series_name = data.date_type === 0 ? '当年能耗' : data.date_type === 1 ? '当月能耗' : '当日能耗';
        storage
            .load({key: 'loginState'})
            .then((loginState) => {
                Api.setToken(loginState.token)
                    .get(`/api/steam/rank_${data.rank_type}`, {date_type, type, time: data.date})
                    .then((data) => {
                        this.setState({
                            empty: data.table_data.length < 1,
                            isRefreshing: false,
                            table_data: data.table_data,
                            option: {
                                title: {
                                    text: title,
                                    x: 'center',
                                    y: 10,

                                },
                                tooltip: {
                                    trigger: 'item',
                                    confine: true,
                                    position: function (point, params, dom, rect, size) {
                                        return ['10%', point[1] + 15];
                                    },
                                    formatter(params, ticket, callback) {
                                        let res = '<p  style="margin: 0px; ">名称：'
                                            + params.name + '</p>';
                                        res += '<p style="margin: 0px; "><span >' + params.seriesName + '</span><span>： '
                                            + params.data.value.toFixed(2)
                                            + '</span></p>';
                                        return res;
                                    }
                                },
                                legend: {
                                    type: 'scroll',
                                    orient: 'vertical',
                                    top: 'middle',
                                    right: '5px',
                                    data: data.chart.legend,
                                    textStyle: {
                                        fontSize: 7,
                                    },
                                    itemWidth: 13,
                                    itemHeight: 7,
                                    //selected: data.selected
                                },
                                color: Color.pieColors,
                                series: [
                                    {
                                        name: series_name,
                                        type: 'pie',
                                        radius: '60%',
                                        center: ['30%', '50%'],
                                        data: data.chart.data,
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
                                ],
                                grid: {

                                    top: '20%',

                                }
                            },
                            ratio: isFold ? 'tce' : `${loginState.unit.steam_usage}`,
                            isLoading: false,
                        })
                        ;
                    })
                    .catch((error) => {
                        console.log(error);
                        this.setState({
                            isRefreshing: false,
                            isLoading: false,
                        });
                        Toast.message(error.response);
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
    typeStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 40,
        width: SCREEN_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
    }

});
