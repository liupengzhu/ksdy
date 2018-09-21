import {ActivityIndicator, Text, View} from 'react-native';
import React from "react";
import {Overlay, Theme} from 'teaset';


let overlayView = (
    <Overlay.View
        style={{alignItems: 'center', justifyContent: 'center'}}
        modal={true}
        overlayOpacity={0.5}
    >
        <View style={{
            backgroundColor: '#0000009a',
            padding: 40,
            borderRadius: 10,
            alignItems: 'center',
        }}>
            <ActivityIndicator size='large' color={Theme.toastIconTintColor}/>
            <Text style={{color: 'white', fontSize: 15, marginTop: 10}}>正在加载...</Text>
        </View>
    </Overlay.View>
);
let key = null;
export default class LoadingToast {

    show() {
        key = Overlay.show(overlayView);
    }

    hide() {
        if (key) {
            Overlay.hide(key);
        }
    }
}
