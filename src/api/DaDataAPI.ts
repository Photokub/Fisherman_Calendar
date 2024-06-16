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

    postDaData() {
        return this._request(`${this._adress}`, {
            method: "POST",
            mode: "cors",
            headers: this._headers,
            body: JSON.stringify(query)
        })
    }

}

// const lat = App.lat; 
// const long = App.long

const token = '9072717adc99491fe694b2974268697a8c66958c';
//const query = { lat, long};
const query = { lat: 55.878, lon: 37.653 };

export const daDataApi = new DaDataApi({
    baseUrl: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address',
    headers: {
        "content-type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + token
        //'X-RapidAPI-Key': '9072717adc99491fe694b2974268697a8c66958c',
        //'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
})