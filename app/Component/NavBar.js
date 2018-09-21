/**
 * Created by Rabbit 下午6:40
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {};
export default class NavBar extends Component<Props> {
    render() {
        // console.log(this.props);
        let leftIcon = this.props.drawerIcon
            ? <TouchableOpacity
                style={[{marginLeft: 15}, this.props.drawerIcon.props.style]}
                activeOpacity={0.5}
                onPress={() => {
                    this.props.navigation.openDrawer();
                }}
            >
                <Image source={this.props.drawerIcon.props.source}
                       style={[this.props.drawerIcon.props.style]}/>
            </TouchableOpacity>
            : (this.props.scenes.length > 1
                ? <TouchableOpacity
                    style={{marginLeft: 15, width: 30, height: 30}}
                    activeOpacity={0.5}
                    onPress={() => {
                        this.props.navigation.pop();
                    }}
                >
                    <Image source={Images.LeftIcon}
                           style={{width: 30, height: 30}}/>
                </TouchableOpacity>
                : <View/>);
        let rightIcon = this.props.rightButtonImage
            ? <TouchableOpacity
                style={[{marginRight: 15, width: 30, height: 30}]}
                activeOpacity={0.5}
                onPress={this.props.onRight}
            >
                <Image source={this.props.rightButtonImage} style={{width: 30, height: 30}}/>
            </TouchableOpacity>
            : <View/>;
        return (
            <LinearGradient
                start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                colors={[Color.tool_bar_color1, Color.tool_bar_color2]}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: 64,
                    alignItems: 'center',
                    paddingTop: 20
                }}>
                <View style={{flex: 1}}>
                    {leftIcon}
                </View>

                <Text style={{color: 'white', fontSize: 17}}>{this.props.title}</Text>
                <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                    {rightIcon}
                </View>
            </LinearGradient>
        );
    }
}
