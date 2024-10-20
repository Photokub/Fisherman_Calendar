//import {lat, long} from "../components/App/App.tsx"
//import App from "../components/App/App";

class DaDataApi {
    private _headers: any;
    private _adress: any;

    constructor(setting: any) {
        this._adress = setting.baseUrl;
        this._headers = setting.headers;
    }

    _request(url: RequestInfo | URL, options: RequestInit | undefined) {
        return fetch(url, options).then(this.handleResp)
    }

    handleResp(res: any) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
        }
        return res.json();
    }

    postDaData(data: any) {
        return this._request(`${this._adress}`, {
            method: "POST",
            mode: "cors",
            headers: this._headers,
            body: JSON.stringify(data)
        })
    }

}

const token = '9072717adc99491fe694b2974268697a8c66958c';

export const daDataApi = new DaDataApi({
    baseUrl: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address',
    headers: {
        "content-type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + token
    }
})