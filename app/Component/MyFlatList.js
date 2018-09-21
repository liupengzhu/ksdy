import React from 'react';
import {
    Text,
    View,
    Image,
    FlatList,
    StyleSheet
} from 'react-native';
import ItemSeparatorLine from "./ItemSeparatorLine";
import EmptyView from "./EmptyView";
import FootView from "./FootView";

const MyFlatList = (props) => {
    let itemSeparatorComponent = props.ItemSeparatorComponent
        ? props.ItemSeparatorComponent
        : props.hideItemSeparatorComponent ? <View/> : <ItemSeparatorLine/>;
    return (

        <FlatList style={styles.container}
                  data={props.data}

                  renderItem={props.renderItem}

                  ItemSeparatorComponent={props.ItemSeparatorComponent}
            // 空布局
                  ListEmptyComponent={<EmptyView/>}
                  ListFooterComponent={<FootView
                      showFoot={props.showFoot}
                  />}
                  onEndReached={props.onEndReached}
                  onEndReachedThreshold={1}

            //下拉刷新相关
                  onRefresh={props.onRefresh}
                  refreshing={props.refreshing}
                  keyExtractor={(item, index) => {
                      return item.id + ""
                  }}

        />
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.tab_background,
    }
});
export default MyFlatList;