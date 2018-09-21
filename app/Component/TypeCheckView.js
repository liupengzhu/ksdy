import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export default class TypeCheckView extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            checkedId: props.checked ? props.checked : 0,
        }
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <TouchableOpacity
                    style={{flex: 1}}
                    activeOpacity={0.5}
                    onPress={() => {
                        this.setState({checkedId: 0})
                    }}>
                    <View
                        style={[styles.leftButton, {backgroundColor: this.state.checkedId === 0 ? Color.tab_text_color1 : 'white'}]}>
                        <Text
                            style={[styles.text, {color: this.state.checkedId === 0 ? 'white' : Color.tab_text_color1}]}>原始数据</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{flex: 1}}
                    activeOpacity={0.5}
                    onPress={() => {
                        this.setState({checkedId: 1})
                    }}>
                    <View
                        style={[styles.rightButton, {backgroundColor: this.state.checkedId === 1 ? Color.tab_text_color1 : 'white'}]}>
                        <Text
                            style={[styles.text, {color: this.state.checkedId === 1 ? 'white' : Color.tab_text_color1}]}>等价折标</Text>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.checkedId === this.state.checkedId) {
            return false;
        } else {
            this.props.onChange(nextState.checkedId);
        }
        return true;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 30,
        flexDirection: 'row',
    },
    leftButton: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: Color.tab_text_color1,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',

    },
    middleButton: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: Color.tab_text_color1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightButton: {
        flex: 1,
        borderColor: Color.tab_text_color1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderRightWidth: 0.5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        marginLeft: -0.5
    },
    text: {
        fontSize: 10
    }

});
