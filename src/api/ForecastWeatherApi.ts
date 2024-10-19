class ForecastWeatherApi {
    private _headers: any;
    private _adress: any;
    //private _cords: any;

    constructor(setting: any) {
        //this._adress = setting.baseUrl;
        this._headers = setting.headers;
    }

    // lat = 55.9137812;
    // lon = 37.8065227;

    _request(url: RequestInfo | URL, options: RequestInit | undefined) {
        if (url !== undefined) {
            return fetch(url, options).then(this.handleResp)
        } else {
            console.error('URL IS UNDEFINED СЕЙЧАС')
        }
    }

    handleResp(res: any) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
        }
        return res.json();
    }

    //нужно каким-то образом передать координаты браузера в baseUrl

    // _handleCordsFromBrowser(lat: number, lon: number) {
    //     const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${lat}%2C${lon}&days=3`;
    //     return url
    // }

    // getForecastData() {
    //     return this._request(`${this._adress}`, {
    //         method: "GET",
    //         headers: this._headers,
    //     })
    // }

    getForecastData(url: any) {
        return this._request(url, {
            method: "GET",
            headers: this._headers,
        })
    }
}



// const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${lat}%2C${lon}&days=3`;

export const forecastFeatherApi = new ForecastWeatherApi({
    //baseUrl: url,
    //baseUrl: '',
    headers: {
        "content-type": "application/json",
        "Accept": "application/json",
        'X-RapidAPI-Key': '0fd9378213mshc275dc63a616eb0p1830b2jsn79a69c8f0924',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
})