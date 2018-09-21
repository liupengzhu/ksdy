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
    View,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView,
    RefreshControl
} from 'react-native';
import '../../Common/Global';
import HomeItem from "../../Component/HomeItem";
import {Toast} from 'teaset';

type Props = {};
export default class HomePage extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            unit: {
                active_power: "",
                carbon_emissions: "",
                elec: "",
                energy_usage: "",
                frequency: "",
                gas_usage: "",
                installed_capacity: "",
                load: "",
                power: "",
                reactive_power: "",
                steam_usage: "",
                temperature: "",
                ten_million: "",
                vol: "",
                water_usage: "",
            },
            data: {
                power: {
                    data: null,
                    ratio: null,
                },
                power_generated: {
                    data: null,
                    ratio: null,
                }
            },
            isRefreshing: false,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.imageBackground} source={Images.HomeBackground}>
                    <TouchableOpacity style={styles.menu} activeOpacity={0.5} onPress={() => {
                        Actions.drawerOpen()
                    }}>
                        <Image source={Images.Menu} style={{width: 30, height: 30}}/>
                    </TouchableOpacity>
                    <Text style={[styles.title, {marginTop: SCREEN_WIDTH / 8}]}>{Config.title_main}</Text>
                    <Text style={[styles.title, {marginTop: 5}]}>{Config.title}</Text>
                </ImageBackground>
                <View style={{flex: 1, backgroundColor: Color.tab_background}}>
                    <ScrollView refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            progressBackgroundColor="#ffffff"
                        />
                    }
                    >
                        <View style={{flexDirection: 'row'}}>
                            <HomeItem title={'总用电量'}
                                      content={this.state.data.power.data}
                                      color={Color.home_color1}
                                      icon={Images.HomeElectricIcon}
                                      onPress={() => {
                                          this._onItemPress('electric');
                                      }}
                                      unit={this.state.data.power.ratio + this.state.unit.power}
                            />
                            <HomeItem title={'总用水量'}
                                      content={this.state.data.water}
                                      color={Color.home_color2}
                                      icon={Images.HomeWaterIcon}
                                      onPress={() => {
                                          this._onItemPress('water');
                                      }}
                                      unit={this.state.unit.water_usage}
                            />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <HomeItem title={'总用汽量'}
                                      content={this.state.data.steam}
                                      color={Color.home_color3}
                                      icon={Images.HomeSteamIcon}
                                      onPress={() => {
                                          this._onItemPress('steam');
                                      }}
                                      unit={this.state.unit.steam_usage}
                            />
                            <HomeItem title={'总用气量'}
                                      content={this.state.data.gas}
                                      color={Color.home_color4}
                                      icon={Images.HomeGasIcon}
                                      onPress={() => {
                                          this._onItemPress('gas');
                                      }}
                                      unit={this.state.unit.gas_usage}
                            />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <HomeItem title={'光伏发电'}
                                      content={this.state.data.power_generated.data}
                                      color={Color.home_color7}
                                      icon={Images.HomeGenerationIcon}
                                      onPress={() => {
                                          this._onItemPress('power');
                                      }}
                                      unit={this.state.data.power_generated.ratio + this.state.unit.power}
                            />
                            <HomeItem title={'碳排放量'}
                                      content={this.state.data.carbon}
                                      color={Color.home_color6}
                                      icon={Images.HomeCarbonIcon}
                                      onPress={() => {
                                          this._onItemPress('carbon');
                                      }}
                                      unit={this.state.unit.carbon_emissions}
                            />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <HomeItem title={'综合能耗'}
                                      content={this.state.data.energy}
                                      color={Color.home_color5}
                                      icon={Images.HomeEnergyIcon}
                                      unit={this.state.unit.energy_usage}
                            />
                            <HomeItem title={'安全用电天数'}
                                      content={this.state.data.safe_day}
                                      color={Color.home_color8}
                                      icon={Images.HomeDayIcon}
                                      unit={"天"}
                            />
                        </View>
                        <View style={{alignItems: 'center', padding: 5}}>
                            <Text style={{color: Color.home_text_l, fontSize: 8}}>以上数据均为当月数据</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => {
                            this._buttonOnPress()
                        }}>
                            <View style={styles.button}>
                                <View style={{width: 15}}></View>
                                <Text style={{color: Color.tab_text_color1}}>历史数据总览</Text>
                                <Image style={{width: 15, height: 15}} source={Images.RightIcon}/>
                            </View>
                        </TouchableOpacity>

                    </ScrollView>
                </View>
            </View>
        );
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        this._sendRequest();
    }

    _onItemPress(type) {
        switch (type) {
            case 'electric':
                Actions.electricPage();
                break;
            case 'water':
                Actions.waterPage();
                break;
            case 'steam':
                Actions.steamPage();
                break;
            case 'gas':
                Actions.gasPage();
                break;
            case 'power':
                Actions.powerPage();
                break;
            case 'carbon':
                Actions.carbonPage();
                break;
            default:
                break;
        }
    }

    _buttonOnPress() {

    }

    componentDidMount() {
        storage.load({key: 'loginState'}).then(data => {
            this.setState({
                unit: data.unit,
            });
        });
        this._sendRequest();
    }

    _sendRequest() {
        storage.load({key: 'loginState'}).then(data => {
            Api.setToken(data.token)
                .get('/api/home/data_screen')
                .then((data) => {
                    this.setState({data: data, isRefreshing: false});
                })
                .catch((error) => {
                    this.setState({isRefreshing: false});
                    Toast.message(error.response);
                });
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menu: {
        position: 'absolute',
        left: 15,
        top: 27,
    },
    title: {
        color: 'white',
        fontSize: FONT_SIZE(12),
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 5
    }
});
