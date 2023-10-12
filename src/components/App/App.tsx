import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {Carousel} from "../Carousel/Carousel";
import {SlideContext} from '../../context/SlideContext'
import {forecastFeatherApi} from "../../api/ForecastWeatherApi";
import {astronomyApi} from "../../api/AstronomyApi";
import {connect} from 'react-redux';
import {setDaysArray} from '../../actions/DaysArrayAction'
import {setSelectedDay} from "../../actions/SelectedDayAction";
import DayStatusBar from "../DayStatusBar/DayStatusBar"
// import {subscribe} from "diagnostics_channel";
// import {store} from "../../store/configStore";

// =======PRESSURE INDEX MAP========
//     hi -------------- 1
//     rise#2 ---------- 2
//     desсent#2 ------- 3
//     normal ---------- 4
//     rise#1 ---------- 5
//     desсent#1 ------- 6
//     low ------------- 7
// =================================


interface App {
    forecastData: any,
    daysArray: any,
    selectedDay: any,
    setDaysArray: ([]) => void,
    setSelectedDayAction: any
}

const App: React.FC<App> = (
    {
        setDaysArray,
        daysArray,
    }
) => {

    const [forecastData, setForecastData] = useState({})
    const [selectedDay, setSelectedDay] = useState(0)
    const [disableBackBtn, setDisableBackBtn] = useState(true)
    const [disableForwardBtn, setDisableForwardBtn] = useState(false)
    const [dayStatus, setDayStatus] = useState('Сегодня')

    useEffect(() => {
        try {
            const fetchData = async () => {
                const forecastData = await forecastFeatherApi.getForecastData()
                const astronomyData = await astronomyApi.getAstroData()
                console.log(astronomyData)
                if (!forecastData) {
                    throw new Error('Не удалось получить данные')
                }
                await setForecastData(forecastData.forecast)
                await setDaysArray(forecastData.forecast.forecastday)
                //await handlePressure()
            }
            fetchData()
        } catch (err) {
            console.log(`Ошибка ${err}`)
        }
    }, [])


// получение текущего времени часа
    const currDate = new Date
    const currHour = currDate.getHours()
    console.log(`Текущий час ${currHour}`)

//получение массива прогноза по часам
    useEffect(() => {
        const currHourPressMB = daysArray.days[0]?.hour[currHour].pressure_mb
        console.log(currHourPressMB)
        const currHourPressMM = Math.trunc(currHourPressMB * 0.750063755419211)
        console.log(`Давление на текущий час ${currHourPressMM}`)

        const prwHourPressMB = daysArray.days[0]?.hour[currHour - 1].pressure_mb
        const prwHourPressMM = Math.trunc(prwHourPressMB * 0.750063755419211)
        console.log(`Давление в предыдущем часу ${prwHourPressMM}`)

        const pressureIndex = handlePressureIndex(currHourPressMM, prwHourPressMM)
        console.log(`Индекс давления: ${pressureIndex}`)
    }, [daysArray])

//получение индекса состояния давления

    function handlePressureIndex(cur: number, prw: number) {
        if (cur == 760) {
            if (prw != undefined) {
                if (cur <= prw) {
                    return 3
                } else {
                    return 5
                }
            } else {
                return 4
            }
        } else {
            if (cur > 760) {
                if (cur <= 780) {
                    return 1
                } else {
                    if (prw === undefined) {
                        prw = 760
                    }
                    if (cur < prw) {
                        return 3
                    } else {
                        return 2
                    }
                }
            } else {
                if (cur <= 735) {
                    return 7
                } else {
                    if (prw === undefined) {
                        prw = 760
                    }
                    if (cur < prw) {
                        return 6
                    } else {
                        return 5
                    }
                }
            }
        }
    }

    // useCallback(() => {
    //     console.log(handlePressureIndex())
    // },[])

    const arrFromDaysArr = Array.from(Object.values(daysArray.days))

    useEffect(() => {
        selectedDay <= 0 ? setDisableBackBtn(true) : setDisableBackBtn(false);
        selectedDay >= arrFromDaysArr.length - 1 ? setDisableForwardBtn(true) : setDisableForwardBtn(false);
        dayStatusHandler(selectedDay)
    })

    const dayStatusHandler = (day: any) => {
        switch (day) {
            case 0:
                return setDayStatus("Сегодня")
            case 1:
                return setDayStatus("Завтра")
            case 2:
                return setDayStatus("Послезавтра")
        }
    }

    //const dayStatusTest: any = document.querySelector('.day-status-bar__title')
    //console.log(dayStatusTest)

    const clickForward = () => {
        setSelectedDay(selectedDay + 1)
        //dayStatusTest.classList.add('day-status-bar__title_animated')
        console.log('Нажата кнопка вперёд')
        console.log(selectedDay)
    }

    const clickBack = () => {
        setSelectedDay(selectedDay - 1)
        console.log('Нажата кнопка назад')
        console.log(selectedDay)
    }

    const setStyleColor = (moonPhase: string) => {
        switch (moonPhase) {
            case 'New Moon':
                return 'hsl(0, 90%, 45%)';
            case 'Waxing Crescent':
                return 'hsl(70, 90%, 45%)';
            case 'First Quarter':
                return 'hsl(120, 90%, 45%)';
            case 'Waxing Gibbous':
                return 'hsl(40, 90%, 45%)';
            case 'Full Moon':
                return 'hsl(0, 90%, 45%)';
            case 'Waning Gibbous':
                return 'hsl(40, 90%, 45%)';
            case 'Last Quarter' :
                return 'hsl(120, 90%, 45%)'
            case 'Waning Crescent':
                return 'hsl(70, 90%, 45%)';
            default:
                return '#8f8b8b'
        }
    }

    const setRusMonthName = (monthNumber: string) => {
        switch (monthNumber) {
            case '01':
                return 'Января';
            case '02':
                return 'Февраля';
            case '03':
                return 'Марта';
            case '04':
                return 'Апреля';
            case '05':
                return 'Мая';
            case '06':
                return 'Июня';
            case '07':
                return 'Июля';
            case '08':
                return 'Августа';
            case '09':
                return 'Сентября';
            case '10':
                return 'Октября';
            case '11':
                return 'Ноября';
            case '12':
                return 'Декабря';
            default:
                return 'Этого месяца'
        }
    }

    return (
        <SlideContext.Provider value={{
            selectedDay,
        }}>
            <DayStatusBar
                dayStatus={dayStatus}
            />
            <Carousel
                clickForward={clickForward}
                clickBack={clickBack}
                setStyleColor={setStyleColor}
                setRusMonthName={setRusMonthName}
                disableBackBtn={disableBackBtn}
                disableForwardBtn={disableForwardBtn}
            />
        </SlideContext.Provider>
    );
}

const mapStateToProps = (store: any) => {
    console.log(`Это стор: \n ${store}`)
    return {
        forecastData: store.forecastData,
        daysArray: store.daysArray,
        selectedDay: store.selectedDay,
        astroData: store.astroData
    }
}

const mapDispatchToProps = (dispatch: (arg0: { type: string | number; payload?: object | number; }) => object) => ({
    setDaysArray: (day: object) => dispatch(setDaysArray(day)),
    setSelectedDayAction: (day: number) => dispatch(setSelectedDay(day))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
