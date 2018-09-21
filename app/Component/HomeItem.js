import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import React, {Component} from 'react';

const HomeItem = (props) => {
    let right = props.onPress ? <Image source={Images.RightIcon} style={{width: 13, height: 13}}/> : <View></View>;
    return (
        <TouchableOpacity style={{flex: 1}} activeOpacity={0.5} onPress={props.onPress}>
            <View style={styles.component}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={props.icon} style={{width: 50, height: 50}}/>
                    <View style={styles.textView}>
                        <Text style={{
                            fontSize: 13,
                            color: props.color ? props.color : 'black'
                        }}>{props.content === null ? "正在测试" : props.content}</Text>
                        <Text style={{fontSize: 13, marginTop: 5}}>{props.title}</Text>
                    </View>
                </View>
                {right}
                <Text style={styles.unit}>单位：{props.unit ? props.unit : 'null'}</Text>
            </View>
        </TouchableOpacity>

    );
};
const styles = StyleSheet.create({

    component: {
        flex: 1,
        backgroundColor: 'white',
        borderColor: Color.line,
        borderBottomWidth: 0.5,
        borderRightWidth: 0.5,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 23,
        paddingBottom: 23,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textView: {
        marginLeft: 15,
        flexDirection: 'column',

    },
    unit: {
        fontSize: 8,
        color: Color.home_text_l,
        position: 'absolute',
        right: 10,
        top: 10
    }

});

export default HomeItem;