/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import '../Common/Global';
import LinearGradient from 'react-native-linear-gradient';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
} from 'react-native';
import {
    Button,
    Toast
} from 'teaset';
import {connect} from "react-redux";
import *as loginAction from '../actions/loginAction';
import configureStore from "../store/ConfigureStore";

const store = configureStore();
type Props = {};

class LoginPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
        }
    }

    render() {
        return (
            <LinearGradient start={{x: 1, y: 0}} end={{x: 0, y: 1}}
                            colors={[Color.loginBackgroundColorStart, Color.loginBackgroundColorEnd]} style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image source={Images.Login_Icon} style={styles.icon}/>
                        <Text style={styles.title}>{Config.title_main}</Text>
                        <Text style={styles.title}>{Config.title}</Text>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.inputContainer}>
                            <Image source={Images.UserNameIcon} style={styles.loginIcon}/>
                            <TextInput style={{color: 'white', fontSize: 16, flex: 1}}
                                       selectionColor={'white'}
                                       autoCapitalize={'none'}
                                       onChangeText={(text) => {
                                           this.setState({name: text});
                                       }}
                                       placeholder={'请输入用户名'}
                                       placeholderTextColor={Color.placeholder}
                                       value={this.state.name}

                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Image source={Images.PasswordIcon} style={styles.loginIcon}/>
                            <TextInput style={{color: 'white', fontSize: 16, flex: 1}}
                                       autoCapitalize={'none'}
                                       selectionColor={'white'}
                                       secureTextEntry={true}
                                       onChangeText={(text) => {
                                           this.setState({password: text});
                                       }}
                                       placeholder={'请输入密码'}
                                       placeholderTextColor={Color.placeholder}
                                       value={this.state.password}
                            />
                        </View>
                        {/*<View style={{*/}
                        {/*flexDirection: 'row',*/}
                        {/*width: 0.8 * SCREEN_WIDTH,*/}
                        {/*marginTop: 15,*/}
                        {/*marginLeft: 5,*/}
                        {/*alignItems: 'center'*/}
                        {/*}}>*/}
                        {/*<Checkbox*/}
                        {/*checkedIcon={Images.PasswordChecked}*/}
                        {/*uncheckedIcon={Images.PasswordUnChecked}*/}
                        {/*checkedIconStyle={{width:20,height:20}}*/}
                        {/*uncheckedIconStyle={{width:20,height:20}}*/}
                        {/*activeOpacity={0.8}*/}
                        {/*/>*/}
                        {/*<Text style={{marginLeft: 5}}>记住密码</Text>*/}
                        {/*</View>*/}
                        <Button style={styles.loginButton}
                                activeOpacity={0.5}
                                title={'立即登录'}
                                onPress={() => {
                                    Api.setUrl(Config.url);
                                    this._onLogin()
                                }}
                        />

                        <Button style={styles.testLoginButton}
                                activeOpacity={0.5}
                                title={'演示入口'}
                                titleStyle={{color: 'white'}}
                                onPress={() => {
                                    Api.setUrl(Config.testUrl);
                                    this.props.login('admin', 'sddt8888');
                                }}

                        />
                    </View>
                    <Text style={styles.bottom}>{Config.copyright}</Text>

                </View>
            </LinearGradient>
        );
    }

    componentDidMount() {
        storage.load({key: 'user'}).then(data => {
            this.setState({
                name: data.name,
                password: data.password,
            });
        });
    }

    _onLogin() {
        if (this.state.name === '' || this.state.password == '') {
            Toast.message("账号或密码不能为空");
        } else {
            this.props.login(this.state.name, this.state.password);
            storage.save({
                key: 'user',
                data: {
                    name: this.state.name,
                    password: this.state.password,
                },
            });
        }
    }
}

export default connect(
    (state) => ({
        status: state.loginIn.status,
        isSuccess: state.loginIn.isSuccess,
        data: state.loginIn.data,
    }),
    (dispatch) => ({
        login: (name, password) => dispatch(loginAction.login(name, password)),
    })
)(LoginPage)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SCREEN_HEIGHT / 9,
        marginBottom: SCREEN_HEIGHT / 60
    },
    header: {
        alignItems: 'center'
    },
    icon: {
        width: SCREEN_WIDTH / 4.5,
        height: SCREEN_WIDTH / 4.5,
        marginBottom: 5
    },
    title: {
        color: 'white',
        fontSize: FONT_SIZE(12),
        marginTop: 5
    },
    body: {
        alignItems: 'center'
    },
    bottom: {
        color: '#aaffffff',
        fontSize: FONT_SIZE(6)
    },
    inputContainer: {
        width: 0.8 * SCREEN_WIDTH,
        borderBottomWidth: 0.5,
        borderBottomColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
    },
    loginIcon: {
        width: 27,
        height: 27,
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 2,
        marginRight: 8
    },
    loginButton: {
        width: 0.8 * SCREEN_WIDTH,
        height: 45,
        marginTop: 30,
        borderRadius: 5

    },
    testLoginButton: {
        width: 0.8 * SCREEN_WIDTH,
        height: 45,
        marginTop: 18,
        borderRadius: 5,
        backgroundColor: Color.demo_color2,
        borderWidth: 0.5,
        borderColor: 'black',
    }
});
