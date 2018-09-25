import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {
    Scene,
    Router,
    Actions,
    Reducer,
    Tabs,
    Drawer,
    Stack,
} from 'react-native-router-flux';

import {Provider} from 'react-redux';
import configureStore from './store/ConfigureStore';

import {Theme} from 'teaset';
import TabIcon from './Component/TabIcon';
import HomePage from "./pages/Home/HomePage";
import MapPage from "./pages/Map/MapPage";
import MaintenancePage from "./pages/Event/MaintenancePage";
import DrawerPage from "./pages/DrawerPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./Component/NavBar";
import MainPage from "./pages/MainPage";
import ElectricPage from "./pages/Home/ElectricPage";
import WaterPage from "./pages/Home/WaterPage";
import SteamPage from "./pages/Home/SteamPage";
import GasPage from "./pages/Home/GasPage";
import RenewablePage from "./pages/Home/RenewablePage";
import CarbonPage from "./pages/Home/CarbonPage";
import PowerPage from "./pages/Home/PowerPage";

const store = configureStore();

const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        return defaultReducer(state, action);
    };
};

const getSceneStyle = () => ({
    backgroundColor: Theme.backgroundColor,
});

const onBackPress = () => {
    if (Actions.state.index !== 0) {
        return false;
    }
    Actions.pop();
    return true;
};

const router = (...props) => (
    <Provider store={store}>
        <Router createReducer={reducerCreate}
                getSceneStyle={getSceneStyle}
                backAndroidHandler={onBackPress}
        >
            <Stack hideNavBar headerMode='screen' key='root'>
                <Scene key={'login'}
                       component={LoginPage}
                       type={'reset'}
                />
                <Drawer key={'drawer'}
                        type={'reset'}
                        contentComponent={DrawerPage}
                        drawerIcon={<Image source={Images.Menu} style={{width: 30, height: 30}}/>}
                >
                    <Tabs
                        key="mainTab"                                               // 唯一标识
                        wrap={true}                                             // 自动使用自己的导航栏包装每个场景
                        showLabel={false}                                       // 显示文字
                        tabBarStyle={styles.tabBarStyle}                        // tabBar的样式
                        swipeEnabled={false}                                    // 是否可以滑动
                        headerMode='screen'                                     // 页面切换方式
                        icon={TabIcon}                                          // 自定义Icon显示方式
                        lazy={true}                                             // 是否默认渲染tabbar
                        tabBarPosition={'bottom'}                               // tabbar在顶部还是底部，iOS默认顶部，安卓默认顶部
                        activeBackgroundColor='white'                           // 选中tabbar的背景色
                        inactiveBackgroundColor='white'                         // 未选中tabbar的背景色
                        activeTintColor={Color.tabBarSelectedColor}             // 选中tabbar图标的颜色
                        inactiveTintColor={Color.tabBarUnSelectedColor}         // 未选中tabbar图标的颜色
                    >

                        <Scene component={HomePage}
                               hideNavBar
                               key="home"
                               title={'数据总览'}
                               image={Images.Home}
                               selectedImage={Images.Home}/>
                        <Scene component={MapPage}
                               key="map"
                               title='用能地图'
                               image={Images.Map}
                               navBar={NavBar}
                               selectedImage={Images.Map}/>
                        <Scene component={MaintenancePage}
                               key="eventOverview"
                               title='事件总览'
                               navBar={NavBar}
                               image={Images.Maintenance}
                               selectedImage={Images.Maintenance}/>
                    </Tabs>
                </Drawer>
                {/*// 推荐把需要的路由放在<Tabs/>后面，跳转的时候通过key，Actions.Test3_key*/}
                <Scene component={ElectricPage} hideNavBar={false} navBar={NavBar} key={'electricPage'} title={'用电详情'}/>
                <Scene component={WaterPage} hideNavBar={false} navBar={NavBar} key={'waterPage'} title={'用水详情'}/>
                <Scene component={SteamPage} hideNavBar={false} navBar={NavBar} key={'steamPage'} title={'用汽详情'}/>
                <Scene component={GasPage} hideNavBar={false} navBar={NavBar} key={'gasPage'} title={'用气详情'}/>
                <Scene component={RenewablePage} hideNavBar={false} navBar={NavBar} key={'renewablePage'}
                       title={'可再生能源'}/>
                <Scene component={CarbonPage} hideNavBar={false} navBar={NavBar} key={'carbonPage'} title={'碳排放量'}/>
                <Scene component={PowerPage} hideNavBar={false} navBar={NavBar} key={'powerPage'} title={'能耗详情'}/>
                <Scene component={MainPage} hideNavBar={false} navBar={NavBar} key={'mainPage'} title={'mian'}/>
            </Stack>
        </Router>
    </Provider>
);

export default router;

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#eee',
        height: 49,
    },
});