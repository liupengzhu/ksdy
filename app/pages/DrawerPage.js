/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Linking
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {};
export default class DrawerPage extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <LinearGradient start={{x: 1, y: 0}} end={{x: 0, y: 1}}
                                colors={[Color.tool_bar_color1, Color.tool_bar_color2]}
                                style={{height: SCREEN_HEIGHT / 3, alignItems: 'center', justifyContent: 'center'}}>
                    <Image style={styles.image} source={Images.Menu_Logo}/>
                    <Text style={styles.title}>{Config.title_main + Config.title}</Text>
                    <Text style={styles.user}>admin</Text>
                </LinearGradient>
                <View style={{flex: 1, justifyContent: 'space-between'}}>
                    <View>
                        <TouchableOpacity style={styles.item1}
                                          onPress={() => {
                                              this._tell('0512-36692017');
                                          }}
                                          activeOpacity={0.5}>
                            <Text style={styles.itemKey}>调度电话：</Text>
                            <Text style={styles.itemValue}>0512-36692017</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item1}
                                          activeOpacity={1}>
                            <Text style={styles.itemKey}>技术支持：</Text>
                        </TouchableOpacity>
                        <View style={styles.item2}>
                            <Image style={styles.logo1} source={Images.Logo1}/>
                            <Text style={{fontSize: FONT_SIZE(9)}}>苏州大学</Text>
                        </View>
                        <TouchableOpacity style={[styles.item2, {flexDirection: 'column', alignItems: 'flex-start'}]}
                                          activeOpacity={0.5}
                                          onPress={() => {
                                              this._tell('0512-66103865');
                                          }}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image style={styles.logo1} source={Images.Logo2}/>
                                <Text style={{fontSize: FONT_SIZE(9)}}>苏州琅润达检测科技有限公司</Text>
                            </View>
                            <Text style={{
                                color: Color.home_text_l,
                                fontSize: FONT_SIZE(9),
                                marginLeft: 35
                            }}>0512-66103865</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottom}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => {
                                this._reset();
                            }}
                            style={{
                                flex: 1,
                                borderTopColor: Color.line,
                                borderTopWidth: 0.5,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <Text style={{fontSize: FONT_SIZE(10), color: Color.tab_text_color1}}>修改密码</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => {
                                this._logout();
                            }}
                            style={{
                                flex: 1,
                                borderColor: Color.line,
                                borderTopWidth: 0.5,
                                borderLeftWidth: 0.5,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <Text style={{fontSize: FONT_SIZE(10), color: Color.tab_text_color1}}>注销登录</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        );
    }

    _logout() {
        storage.load({key: 'loginState'}).then(data => {
            Api.setToken(data.token)
                .get('/api/logout')
                .then((data) => {
                    Actions.login();
                })
                .catch((error) => {
                    Actions.login();
                });
        });
    }

    _reset() {

    }

    _tell(number) {
        let url = 'tel: ' + number;
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: 70,
        height: 70,
        marginTop: 10
    },
    title: {
        color: 'white',
        fontSize: FONT_SIZE(9),
        marginTop: 15
    },
    user: {
        color: 'white',
        fontSize: FONT_SIZE(9),
        marginTop: 5
    },
    bottom: {
        height: 45,
        flexDirection: 'row'
    },
    item1: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Color.line,
        borderBottomWidth: 0.5,
        paddingLeft: 15
    },
    itemKey: {
        color: Color.home_text_l,
        fontSize: FONT_SIZE(10),
    },
    itemValue: {
        fontSize: FONT_SIZE(10),
    },
    item2: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 40,
        paddingTop: 5,
    },
    logo1: {
        width: 25,
        height: 25,
        marginRight: 10,
    }
});
