/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import DateCheckView from "../../../Component/DateCheckView";
import InputView from "../../../Component/InputView";
import moment from "moment/moment";
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Toast} from "teaset";
import MyFlatList from "../../../Component/MyFlatList";
import RenewableRankItem from "../../../Component/item/RenewableRankItem";

type Props = {};
let page = 1;
let totalPage;
export default class RenewableRankFragment extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            date_type: 1,
            type: 0,
            date: '2018-08-04',
            isVisible: false,
            data: [],
            isRefreshing: false,
            ratio: '',
            empty: false,
            isLoading: false,
            showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
            error: false,
            errorMessage: '',
        }
    }

    render() {

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
                <View style={{flex: 1}}>
                    <MyFlatList
                        data={this.state.data}
                        renderItem={this._renderItem.bind(this)}
                        //下拉刷新相关
                        refreshing={this.state.isRefreshing}
                        onRefresh={() => this._onRefresh()}

                        //上拉加载相关
                        showFoot={this.state.showFoot}
                        onEndReached={this._onEndReached.bind(this)}

                        errorOnPress={this._errorOnPress.bind(this)}
                        isLoading={this.state.isLoading}
                        isError={this.state.error}
                    />
                </View>
            </View>
        );
    }

    componentWillMount() {
        this.setState({date: moment().format("YYYY-MM"), isLoading: true});
    }

    componentDidMount() {
        this._sendRequest(this.state);
    }

    _errorOnPress() {
        page = 1;
        this.setState({
            isLoading: true
        });
        this._sendRequest(this.state);
    }

    _onRefresh() {
        // 不处于 下拉刷新
        if (!this.state.isRefreshing) {
            page = 1;
            this._sendRequest(this.state);
        }
    }

    _onEndReached() {
        //如果是正在加载中或没有更多数据了，则返回
        if (this.state.showFoot != 0) {
            return;
        }
        //如果当前页大于或等于总页数，那就是到最后一页了，返回
        if ((page != 1) && (page >= totalPage)) {
            return;
        } else {
            page++;
        }
        //底部显示正在加载更多数据
        this.setState({showFoot: 2});
        //获取数据
        this._sendRequest(this.state);
    }

    _renderItem({item}) {
        return (<RenewableRankItem data={item} ratio={this.state.ratio}/>);
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
        storage
            .load({key: 'loginState'})
            .then((loginState) => {
                Api.setToken(loginState.token)
                    .get('/api/renewable/rank_lists', {date_type, time: data.date, page: page})
                    .then((data) => {
                        console.log(data);
                        page = data.current_page;
                        totalPage = data.last_page;
                        let foot = 0;
                        if (!page || (page >= totalPage && data.data.length > 0)) {
                            foot = 1;//listView底部显示没有更多数据了
                        }
                        this.setState({
                            data: data.data,
                            ratio: `(${data.ratio}${loginState.unit.power})`,
                            isLoading: false,
                            showFoot: foot,
                            isRefreshing: false,
                            error: false
                        });
                    })
                    .catch((error) => {
                        this.setState({
                            data: [],
                            isLoading: false,
                            error: true,
                            errorMessage: error.response
                        });
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
    typeStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 40,
        width: SCREEN_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
