import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export default class RankTypeView extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked === 'industry' ? props.checked : 'company',
        }
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <TouchableOpacity
                    style={{flex: 1}}
                    activeOpacity={0.8}
                    onPress={() => {
                        this.setState({checked: 'company'})
                    }}>
                    <View
                        style={[styles.leftButton, {
                            backgroundColor: this.state.checked === 'company'
                                ? Color.tab_text_color1 : 'white'
                        }]}>
                        <Text
                            style={[styles.text, {
                                color: this.state.checked === 'company'
                                    ? 'white' : Color.tab_text_color1
                            }]}>企业排行</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{flex: 1}}
                    activeOpacity={0.8}
                    onPress={() => {
                        this.setState({checked: 'industry'})
                    }}>
                    <View
                        style={[styles.rightButton, {
                            backgroundColor: this.state.checked === 'industry'
                                ? Color.tab_text_color1 : 'white'
                        }]}>
                        <Text
                            style={[styles.text, {
                                color: this.state.checked === 'industry'
                                    ? 'white' : Color.tab_text_color1
                            }]}>行业排行</Text>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.checked === this.state.checked) {
            return false;
        } else {
            this.props.onChange(nextState.checked);
        }
        return true;
    }
}

const styles = StyleSheet.create({
    container: {
        width: 120,
        height: 25,
        flexDirection: 'row',
        shadowColor: 'black',
        shadowRadius: 25,
        shadowOpacity: 0.3,
    },
    leftButton: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: Color.tab_text_color1,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
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
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        marginLeft: -0.5
    },
    text: {
        fontSize: 10
    }

});
