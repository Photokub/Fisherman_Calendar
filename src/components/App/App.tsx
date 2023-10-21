import React, {useEffect, useState, useMemo} from 'react';
import './App.css';
import {Carousel} from "../Carousel/Carousel";
import {SlideContext} from '../../context/SlideContext'
import {forecastFeatherApi} from "../../api/ForecastWeatherApi";
import {daDataApi} from "../../api/DaDataAPI"
import {astronomyApi} from "../../api/AstronomyApi";
import {connect} from 'react-redux';
import {setDaysArray} from '../../actions/DaysArrayAction'
import {setSelectedDay} from "../../actions/SelectedDayAction";
import DayStatusBar from "../DayStatusBar/DayStatusBar"
import {PressureBar} from "../PressureBar/PressureBar";
import {handlePastPressureVerdict} from "../../utils/handlePastPressureVerdict";
import {handleNextPressureVerdict} from "../../utils/handleNextPressureVerdict";
import {handleFuturePressureVerdict} from "../../utils/handleFuturePressureVerdict";
import {handlePressIndexCurToPast} from "../../utils/handlePressIndexCurToPast";
import {handlePressIndexCurToNext} from "../../utils/handlePressIndexCurToNext";
import {handleAveragePressIndex} from "../../utils/handleAveragePressIndex";
import {dayStatusHandler} from "../../utils/dayStatusHandler";
import {indexPressureConv} from "../../utils/indexPressureConv";
import {handleHueValue} from "../../utils/handleHueValue";
import {setRusMonthName} from "../../utils/setRusMonthName";
import {handleHueParam} from "../../utils/handleHueParam";
import {usePosition} from "../../utils/usePosition";
import {setStyleColor} from "../../utils/setStyleColor";
import {ConditionBar} from "../ConditionBar/ConditionBar";


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
    const [pressureIndexAverage, setPressureIndexAverage] = useState<number>(0)
    const [pressureVerdictAverage, setPressureVerdictAverage] = useState('')
    const arrFromDaysArr = Array.from(Object.values(daysArray.days))

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


    function pressureConvertorMBtoMM(mb: number) {
        return Math.round(mb * 0.750063755419211)
    }

    useMemo(() => {

        const prvHourPressMB = daysArray.days[0]?.hour[currHour - 1].pressure_mb
        const prvHourPressMM = pressureConvertorMBtoMM(prvHourPressMB)
        console.log(`Давление в предыдущем часу ${prvHourPressMM}`)
        setPreviousHourPressure(prvHourPressMM)

        const currHourPressMB = daysArray.days[0]?.hour[currHour].pressure_mb
        const currHourPressMM = pressureConvertorMBtoMM(currHourPressMB)
        console.log(`Давление на текущий час ${currHourPressMM}`)
        setCurrentHourPressure(currHourPressMM)

        const nxtHourPressMB = daysArray.days[0]?.hour[currHour + 1].pressure_mb
        const nxtHourPressMM = pressureConvertorMBtoMM(nxtHourPressMB)
        console.log(`Давление в следующем часу: ${nxtHourPressMM}`)
        setNextHourPressure(nxtHourPressMM)

        const pIndexPrv = handlePressIndexCurToPast(currHourPressMM, prvHourPressMM, pressureIndexPrv)
        setPressureIndexPrv(pIndexPrv)
        const pIndexNxt = handlePressIndexCurToNext(currHourPressMM, nxtHourPressMM, pressureIndexNext)
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
        pressureVerdictNext,
    ])

    useMemo(() => {
        const pIndexFuture = handleAveragePressIndex(averagePressure)
        setPressureIndexAverage(pIndexFuture)
        const pVerdictFuture = (handleFuturePressureVerdict(pressureIndexAverage))
        setPressureVerdictAverage(pVerdictFuture!)
        console.log(`Индекс давления на день ${selectedDay}: ${pressureIndexAverage}. Состояние : ${pressureVerdictAverage}`)
    }, [averagePressure, pressureVerdictAverage])

    useEffect(() => {
        selectedDay <= 0 ? setDisableBackBtn(true) : setDisableBackBtn(false);
        selectedDay >= arrFromDaysArr.length - 1 ? setDisableForwardBtn(true) : setDisableForwardBtn(false);
        dayStatusHandler(selectedDay, setDayStatus)
    })

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

    useEffect(() => {
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
                return `hsl(${handleHueValue(0, indexPressureConv(handleHueParam(selectedDay, pressureIndexAverage, pressureIndexPrv))!)}, 90%, 45%)`;
            case 'Waxing Crescent':
                return `hsl(${handleHueValue(80, indexPressureConv(handleHueParam(selectedDay, pressureIndexAverage, pressureIndexPrv))!)}, 90%, 45%)`;
            case 'First Quarter':
                return `hsl(${handleHueValue(120, indexPressureConv(handleHueParam(selectedDay, pressureIndexAverage, pressureIndexPrv))!)}, 90%, 45%)`;
            case 'Waxing Gibbous':
                return `hsl(${handleHueValue(40, indexPressureConv(handleHueParam(selectedDay, pressureIndexAverage, pressureIndexPrv))!)}, 90%, 45%)`;
            case 'Full Moon':
                return `hsl(${handleHueValue(0, indexPressureConv(handleHueParam(selectedDay, pressureIndexAverage, pressureIndexPrv))!)}, 90%, 45%)`;
            case 'Waning Gibbous':
                return `hsl(${handleHueValue(40, indexPressureConv(handleHueParam(selectedDay, pressureIndexAverage, pressureIndexPrv))!)}, 90%, 45%)`;
            case 'Last Quarter' :
                return `hsl(${handleHueValue(120, indexPressureConv(handleHueParam(selectedDay, pressureIndexAverage, pressureIndexPrv))!)}, 90%, 45%)`
            case 'Waning Crescent':
                return `hsl(${handleHueValue(80, indexPressureConv(handleHueParam(selectedDay, pressureIndexAverage, pressureIndexPrv))!)}, 90%, 45%)`;
            default:
                return '#8f8b8b'
        }
    }

    //setStyleColor('Waxing Gibbous', selectedDay, pressureIndexAverage, pressureIndexPrv)
    // var options = {
    //     enableHighAccuracy: true,
    //     timeout: 5000,
    //     maximumAge: 0,
    // };
    //
    // function success(pos: any) {
    //     var crd = pos.coords;
    //
    //     console.log("Ваше текущее местоположение:");
    //     console.log(`Широта: ${crd.latitude}`);
    //     console.log(`Долгота: ${crd.longitude}`);
    //     console.log(`Плюс-минус ${crd.accuracy} метров.`);
    // }
    //
    // function error(err: any) {
    //     console.warn(`ERROR(${err.code}): ${err.message}`);
    // }

    //1 получить геолокацию брацзера
    //2 передать её в качестве стор
    //3 сформировать запрос для дадаты по координатам из стора
    //4 передать запрос в дадату и получить город
    //5 передать город в стор
    //6 свормировать квери-запрос погоды по городу из стор

    const position = usePosition();
    console.log(position)

    // navigator.geolocation.getCurrentPosition(success, error, options);

    useEffect(() => {
        daDataApi.postDaData()
            //.then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log("error", error));
    })


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
                pressureVerdictAverage={pressureVerdictAverage}
            />
            {/*<ConditionBar/>*/}
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

export default connect(mapStateToProps, mapDispatchToProps,)(App);
export {App}

