import React from 'react';
import {
    Text,
    View,
    Image,
    FlatList,
    StyleSheet
} from 'react-native';
import EmptyView from "./EmptyView";
import FootView from "./FootView";
import ErrorView from "./ErrorView";
import LoadingView from "./LoadingView";

const MyFlatList = (props) => {
    let content = props.isLoading && !props.isError ? <LoadingView/> : props.isError ?
        <ErrorView
            error={props.errorMessage}
            errorOnPress={props.errorOnPress}/>
        : <FlatList style={styles.container}
            // 空布局
                    ListEmptyComponent={<EmptyView/>}
                    ListFooterComponent={<FootView
                        showFoot={props.showFoot}
                    />}
                    onEndReachedThreshold={1}
                    {...props}
        />;
    return content;
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.tab_background,
    }
});
export default MyFlatList;