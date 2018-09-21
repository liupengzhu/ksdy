//'use strict';

import * as types from '../constants/loginTypes';
import {Toast} from 'teaset';
// 导入事件类型,用来做分配给各个事件

// 访问登录接口 根据返回结果来划分action属于哪个type,然后返回对象,给reducer处理

export function login(username, password) {

    return dispatch => {

        dispatch(isLogining()); // 正在执行登录请求
        loading.show();
        Api
            .post('/api/login', {user: username, pwd: password})
            .then((data) => {
                loading.hide();
                dispatch(loginSuccess(true, data));
                storage.save({
                    key: 'loginState',
                    data: {
                        ...data,
                    },
                });
                Actions.drawer();
            })
            .catch((error) => {
                loading.hide();
                Toast.message(error.response);
                dispatch(loginError(false, error));
            });

    };
}

function isLogining() {

    return {

        type: types.LOGIN_IN_DOING

    }
}

function loginSuccess(isSuccess, data) {

    return {

        type: types.LOGIN_IN_DONE,

        data: data,

    }


}

function loginError(isSuccess, error) {

    return {

        type: types.LOGIN_IN_ERROR,
        data: error,

    }
}
