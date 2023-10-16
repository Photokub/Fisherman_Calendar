import React, {useCallback, useEffect, useState, useMemo} from 'react';
import './App.css';
import {Carousel} from "../Carousel/Carousel";
import {SlideContext} from '../../context/SlideContext'
import {forecastFeatherApi} from "../../api/ForecastWeatherApi";
import {astronomyApi} from "../../api/AstronomyApi";
import {connect} from 'react-redux';
import {setDaysArray} from '../../actions/DaysArrayAction'
import {setSelectedDay} from "../../actions/SelectedDayAction";
import DayStatusBar from "../DayStatusBar/DayStatusBar"
import {PressureBar} from "../PressureBar/PressureBar";
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
    const [pressureIndexPrv, setPressureIndexPrv] = useState<number>(0)
    const [pressureIndexNext, setPressureIndexNext] = useState<number>(0)
    const [currentHourPressure, setCurrentHourPressure] = useState<number>(0)
    const [previousHourPressure, setPreviousHourPressure] = useState<number>(0)
    const [nextHourPressure, setNextHourPressure] = useState<number>(0)
    const [pressureVerdictPrv, setPressureVerdictPrv] = useState('')
    const [pressureVerdictNext, setPressureVerdictNext] = useState('')
    const [averagePressure, setAveragePressure] = useState<number>(0)

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
//     useEffect(() => {
//
//         const prvHourPressMB = daysArray.days[0]?.hour[currHour - 1].pressure_mb
//         const prvHourPressMM = Math.round(prvHourPressMB * 0.750063755419211)
//         console.log(`Давление в предыдущем часу ${prvHourPressMM}`)
//         setPreviousHourPressure(prvHourPressMM)
//
//         const currHourPressMB = daysArray.days[0]?.hour[currHour].pressure_mb
//         const currHourPressMM = Math.round(currHourPressMB * 0.750063755419211)
//         console.log(`Давление на текущий час ${currHourPressMM}`)
//         setCurrentHourPressure(currHourPressMM)
//
//         const nxtHourPressMB = daysArray.days[0]?.hour[currHour + 1].pressure_mb
//         const nxtHourPressMM = Math.round(nxtHourPressMB * 0.750063755419211)
//         console.log(`Давление в следующем часу: ${nxtHourPressMM}`)
//         setNextHourPressure(nxtHourPressMM)
//
//         const pIndexPrv = handlePressIndexCurToPast(currHourPressMM, prvHourPressMM)
//         setPressureIndexPrv(pIndexPrv)
//         const pIndexNxt = handlePressIndexCurToNext(currHourPressMM, nxtHourPressMM)
//         setPressureIndexNext(pIndexNxt)
//         console.log(pIndexNxt)
//         console.log(pressureIndexNext)
//
//         const pVerdictPrv = (handlePastPressureVerdict(pressureIndexPrv))
//         setPressureVerdictPrv(pVerdictPrv!)
//         console.log(`Индекс текущего давления: ${pressureIndexPrv}`)
//
//         const pVerdictPrvNext = (handleNextPressureVerdict(pressureIndexNext))
//         setPressureVerdictNext(pVerdictPrvNext!)
//         console.log(`Индекс следующего давления: ${pressureIndexNext}`)
//
//     } )

    //описание по индексу поведения давления текущего часа к предыдущему
    const handlePastPressureVerdict = (press: number) => {
        switch (press) {
            case 1:
                return 'давление высокое';
            case 2:
                return 'повышение высокого давления';
            case 3:
                return 'понижение высокого давления';
            case 4:
                return 'давление нормальное';
            case 5:
                return 'повышение низкого давления';
            case 6:
                return 'понижение низкого давления';
            case 7:
                return 'давление низкое';
        }
    }

    //описание по индексу поведения давления текущего часа к следующему
    const handleNextPressureVerdict = (press: number) => {
        switch (press) {
            case 1:
                return 'давление будет высокое';
            case 2:
                return ' будет повышение высокого давления';
            case 3:
                return 'будет понижение высокого давления';
            case 4:
                return 'давление будет нормальное';
            case 5:
                return 'будет повышение низкого давления';
            case 6:
                return 'будет понижение низкого давления';
            case 7:
                return 'давление будет низкое';
        }
    }

    function pressureConvertorMBtoMM(mb: number) {
        return Math.round(mb * 0.750063755419211)
    }


    useMemo(() => {

        const prvHourPressMB = daysArray.days[0]?.hour[currHour - 1].pressure_mb
        //const prvHourPressMM = Math.round(prvHourPressMB * 0.750063755419211)
        const prvHourPressMM = pressureConvertorMBtoMM(prvHourPressMB)
        console.log(`Давление в предыдущем часу ${prvHourPressMM}`)
        setPreviousHourPressure(prvHourPressMM)

        const currHourPressMB = daysArray.days[0]?.hour[currHour].pressure_mb
        //const currHourPressMM = Math.round(currHourPressMB * 0.750063755419211)
        const currHourPressMM = pressureConvertorMBtoMM(currHourPressMB)
        console.log(`Давление на текущий час ${currHourPressMM}`)
        setCurrentHourPressure(currHourPressMM)

        const nxtHourPressMB = daysArray.days[0]?.hour[currHour + 1].pressure_mb
        //const nxtHourPressMM = Math.round(nxtHourPressMB * 0.750063755419211)
        const nxtHourPressMM = pressureConvertorMBtoMM(nxtHourPressMB)
        console.log(`Давление в следующем часу: ${nxtHourPressMM}`)
        setNextHourPressure(nxtHourPressMM)

        const pIndexPrv = handlePressIndexCurToPast(currHourPressMM, prvHourPressMM)
        setPressureIndexPrv(pIndexPrv)
        const pIndexNxt = handlePressIndexCurToNext(currHourPressMM, nxtHourPressMM)
        setPressureIndexNext(pIndexNxt)
        console.log(pIndexNxt)
        console.log(pressureIndexNext)

        const pVerdictPrv = (handlePastPressureVerdict(pressureIndexPrv))
        setPressureVerdictPrv(pVerdictPrv!)
        console.log(`Индекс текущего давления: ${pressureIndexPrv}`)

        const pVerdictPrvNext = (handleNextPressureVerdict(pressureIndexNext))
        setPressureVerdictNext(pVerdictPrvNext!)
        console.log(`Индекс следующего давления: ${pressureIndexNext}`)

    }, [
        daysArray,
        pressureIndexPrv,
        pressureIndexNext,
        pressureVerdictPrv,
        pressureVerdictNext
    ])


//получение индекса состояния давления на текущий час по отношению к предыдущему
    function handlePressIndexCurToPast(cur: number, prv: number) {
        if (cur === 760) {
            if (prv !== undefined || null) {
                if (cur <= prv) {
                    return 3
                } else {
                    if (cur === prv) {
                        console.log(`Давление совпало. Будет возвращён pressureIndexPrv ${pressureIndexPrv}`)
                        return pressureIndexPrv
                    } else {
                        return 5
                    }
                }
            } else {
                return 4
            }
        } else {
            if (cur > 760) {
                if (cur >= 780) {
                    return 1
                } else {
                    if (prv === undefined || null) {
                        prv = 760
                    }
                    if (cur < prv) {
                        return 3
                    } else {
                        if (cur === prv) {
                            console.log(`Предыдущее давление совпало. Будет возвращён pressureIndexPrv ${pressureIndexPrv}`)
                            return pressureIndexPrv
                        } else {
                            return 2
                        }
                    }
                }
            } else {
                if (cur <= 735) {
                    return 7
                } else {
                    if (prv === undefined) {
                        prv = 760
                    }
                    if (cur < prv) {
                        return 6
                    } else {
                        if (cur === prv) {
                            console.log(`Предыдущее давление совпало. Будет возвращён pressureIndexPrv ${pressureIndexPrv}`)
                            return pressureIndexPrv
                        } else {
                            return 5
                        }
                    }
                }
            }
        }
    }

    //получение индекса состояния давления на текущий час по отношению к следующему
    function handlePressIndexCurToNext(cur: number, nxt: number) {
        if (cur === 760) {
            if (nxt !== undefined || null) {
                if (cur <= nxt) {
                    return 2
                } else {
                    if (cur === nxt) {
                        console.log(`Давление совпало. Будет возвращён pressureIndex ${pressureIndexNext}`)
                        return pressureIndexNext
                    } else {
                        return 6
                    }
                }
            } else {
                return 4
            }
        } else {
            if (cur > 760) {
                if (cur >= 780) {
                    return 1
                } else {
                    if (nxt === undefined || null) {
                        nxt = 760
                    }
                    if (cur < nxt) {
                        return 2
                    } else {
                        if (cur === nxt) {
                            console.log(`Следующее давление совпало. Будет возвращён pressureIndex ${pressureIndexNext}`)
                            return pressureIndexNext
                        } else {
                            return 3
                        }
                    }
                }
            } else {
                if (cur <= 735) {
                    return 7
                } else {
                    if (nxt === undefined) {
                        nxt = 760
                    }
                    if (cur < nxt) {
                        return 5
                    } else {
                        if (cur === nxt) {
                            console.log(`Следующее давление совпало. Будет возвращён pressureIndex ${pressureIndexNext}`)
                            return pressureIndexNext
                        } else {
                            return 6
                        }
                    }
                }
            }
        }
    }

    //получение индекса давления из среднего за сутки
    function handleAveragePressIndex(avr: number) {
        if (avr === 760) {
            return 4
        } else {
            if (avr > 760) {
                if (avr >= 780) {
                    return 1
                } else {
                    if (avr >= 770) {
                        return 2
                    } else {
                        return 3
                    }
                }
            } else {
                if (avr <= 730) {
                    return 7
                } else {
                    if (avr <= 740) {
                        return 6
                    } else {
                        return 5
                    }
                }
            }
        }
    }

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

    const clickForward = () => {
        setSelectedDay(selectedDay + 1)
        console.log('Нажата кнопка вперёд')
        console.log(selectedDay)
    }

    const clickBack = () => {
        setSelectedDay(selectedDay - 1)
        console.log('Нажата кнопка назад')
        console.log(selectedDay)
    }

    //присвоение вычисления по индексу
    const indexPressureConv = (pressureIndex: number) => {
        switch (pressureIndex) {
            case 1:
                return -30;
            case 2:
                return -20;
            case 3:
                return -10;
            case 4:
                return 0;
            case 5:
                return 10;
            case 6:
                return 20;
        }
    }

    //вычисление Hue
    function handleHueValue(moon: number, press: number) {
        if (moon < press || press > 120) {
            return moon
        } else {
            return moon + press
        }
    }

    // //описание по индексу поведения давления текущего часа к предыдущему
    // const handlePastPressureVerdict = (press: number) => {
    //     switch (press) {
    //         case 1:
    //             return 'давление высокое';
    //         case 2:
    //             return 'повышение высокого давления';
    //         case 3:
    //             return 'понижение высокого давления';
    //         case 4:
    //             return 'давление нормальное';
    //         case 5:
    //             return 'повышение низкого давления';
    //         case 6:
    //             return 'понижение низкого давления';
    //         case 7:
    //             return 'давление низкое';
    //     }
    // }
    //
    // //описание по индексу поведения давления текущего часа к следующему
    // const handleNextPressureVerdict = (press: number) => {
    //     switch (press) {
    //         case 1:
    //             return 'давление будет высокое';
    //         case 2:
    //             return ' будет повышение высокого давления';
    //         case 3:
    //             return 'будет понижение высокого давления';
    //         case 4:
    //             return 'давление будет нормальное';
    //         case 5:
    //             return 'будет повышение низкого давления';
    //         case 6:
    //             return 'будет понижение низкого давления';
    //         case 7:
    //             return 'давление будет низкое';
    //     }
    // }

    //получение среднего давления на завтра

    // function handleFutureData(day: number){
    //     if(day > 0){
    //         return day
    //     } else {
    //         return 1
    //     }
    // }

    useEffect(() => {
        // const day = handleFutureData(selectedDay)
        const selectedDayData = daysArray.days[selectedDay]
        const dayPressureData = selectedDayData?.hour
        console.log(dayPressureData)
        const dayPressureArr = dayPressureData?.map((day: any) => pressureConvertorMBtoMM(day.pressure_mb))
        const middlePressureValue = Math.round((dayPressureArr?.reduce((a: number, b: number) => a + b)) / dayPressureArr?.length)
        console.log(`Среднее значения дня№ ${selectedDay} - ${middlePressureValue}`)
        setAveragePressure(middlePressureValue)

        console.log(dayPressureArr)

    })

    const setStyleColor = (moonPhase: string) => {
        switch (moonPhase) {
            case 'New Moon':
                return `hsl(${handleHueValue(0, indexPressureConv(pressureIndexPrv)!)}, 90%, 45%)`;
            case 'Waxing Crescent':
                return `hsl(${handleHueValue(80, indexPressureConv(pressureIndexPrv)!)}, 90%, 45%)`;
            case 'First Quarter':
                return `hsl(${handleHueValue(120, indexPressureConv(pressureIndexPrv)!)}, 90%, 45%)`;
            case 'Waxing Gibbous':
                return `hsl(${handleHueValue(40, indexPressureConv(pressureIndexPrv)!)}, 90%, 45%)`;
            case 'Full Moon':
                return `hsl(${handleHueValue(0, indexPressureConv(pressureIndexPrv)!)}, 90%, 45%)`;
            case 'Waning Gibbous':
                return `hsl(${handleHueValue(40, indexPressureConv(pressureIndexPrv)!)}, 90%, 45%)`;
            case 'Last Quarter' :
                return `hsl(${handleHueValue(120, indexPressureConv(pressureIndexPrv)!)}, 90%, 45%)`
            case 'Waning Crescent':
                return `hsl(${handleHueValue(80, indexPressureConv(pressureIndexPrv)!)}, 90%, 45%)`;
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
            <PressureBar
                currentHourPressure={currentHourPressure}
                pressureVerdictPrv={pressureVerdictPrv}
                pressureVerdictNext={pressureVerdictNext}
                selectedDay={selectedDay}
                averagePressure={averagePressure}
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
