export interface IDay {
    day?: number
    month?: string
}

export interface IAstro {
    is_moon_up :  number
    is_sun_up  :  number
    moon_illumination : string
    moon_phase :  string
    moonrise   :  string
    moonset    :  string
    sunrise    :  string
    sunset     :  string
}