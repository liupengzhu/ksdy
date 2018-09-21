import Config from "./Config";

let _token = '';
let api_url = Config.url;
let navigation = null;

let xmlRequest = function (options) {

    let defaults = {
        method: 'GET',
        url: '',
        data: {},
        headers: {},
        token: _token
    };

    options = {...defaults, ...options};
    if (options.method.toUpperCase() == 'GET' || options.method.toUpperCase() == 'DELETE' || options.method.toUpperCase() == 'PUT') {
        delete options.data;
    }

    return new Promise((resolve, reject) => {

        let requestStatus;

        fetch(options.url,
            {
                method: options.method,
                headers: {
                    'X-CSRF-TOKEN': options.token,
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: options.data
            })
            .then(response => {
                requestStatus = response.status;
                return response.json();
            })
            .then(response => {
                if (requestStatus == 200) {
                    resolve(response);
                } else if (requestStatus == 412 || requestStatus == 401) {
                    Actions.login();
                }
                else {
                    for (let key in response.response) {
                        reject({status: requestStatus, response: response.response[key]});
                        return;
                    }
                    reject({status: requestStatus, response: response.message});
                }
            })
            .catch(error => {
                reject({status: -1, response: '网络异常'});
            });
    });
};

/**
 * map对象转为 url 参数格式，例如：a=1&b=2&c=3
 * @param obj
 * @returns {string}
 */
let ObjectToParams = function (obj) {
    return Object.keys(obj).map(key => `${key}=${encodeURIComponent(obj[key])}`).join('&');
};

export default class Api {

    setUrl(url) {
        api_url = url;
        return this;
    }

    setToken(token) {
        _token = token;
        return this;
    };


    get(url, data) {

        url = api_url + url;
        url += (-1 === url.indexOf('?')) ? '?' : '&';

        return xmlRequest({
            method: 'GET',
            url: url + (data ? ObjectToParams(data) : ""),
        });
    };

    post(url, data) {
        let formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }
        return xmlRequest({
            method: 'POST',
            url: api_url + url,
            data: formData
        });
    };

    put(url, data) {

        url = api_url + url;
        url += (-1 === url.indexOf('?')) ? '?' : '&';

        return xmlRequest({
            method: 'PUT',
            url: url + (data ? ObjectToParams(data) : ""),
        });
    };

    delete(url, data) {
        url = api_url + url;
        url += (-1 === url.indexOf('?')) ? '?' : '&';

        return xmlRequest({
            method: 'DELETE',
            url: url + (data ? ObjectToParams(data) : ""),
        });
    };

}

