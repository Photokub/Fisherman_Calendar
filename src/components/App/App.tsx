import React, { useEffect, useState, useMemo, useCallback } from 'react';
import './App.css';
import { Preloader } from '../Preloader/Preloader'
import { Carousel } from "../Carousel/Carousel";
import { SlideContext } from '../../context/SlideContext'
import { forecastFeatherApi } from "../../api/ForecastWeatherApi";
import { daDataApi } from "../../api/DaDataAPI"
import { astronomyApi } from "../../api/AstronomyApi";
import { connect } from 'react-redux';
import { setDaysArray } from '../../actions/DaysArrayAction'
import { setSelectedDay } from "../../actions/SelectedDayAction";
import DayStatusBar from "../DayStatusBar/DayStatusBar"
import { PressureBar } from "../PressureBar/PressureBar";
import { handlePastPressureVerdict } from "../../utils/handlePastPressureVerdict";
import { handleNextPressureVerdict } from "../../utils/handleNextPressureVerdict";
import { handleFuturePressureVerdict } from "../../utils/handleFuturePressureVerdict";
import { handlePressIndexCurToPast } from "../../utils/handlePressIndexCurToPast";
import { handlePressIndexCurToNext } from "../../utils/handlePressIndexCurToNext";
import { handleAveragePressIndex } from "../../utils/handleAveragePressIndex";
import { dayStatusHandler } from "../../utils/dayStatusHandler";
import { indexPressureConv } from "../../utils/indexPressureConv";
import { handleHueValue } from "../../utils/handleHueValue";
import { setRusMonthName } from "../../utils/setRusMonthName";
import { handleHueParam } from "../../utils/handleHueParam";
import { usePosition } from "../../utils/usePosition";
import { setStyleColor } from "../../utils/setStyleColor";
import { ConditionBar } from "../ConditionBar/ConditionBar";
import { Interface }  from '../Interface/Interface';


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
    const [isForecastDataFetched, setIsForecastDataFetched] = useState<boolean>(false)
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
    //const [cords, setCords] = useState({'lat': 0, 'long': 0})
    const [cords, setCords] = useState<any>()
    const [lat, setLat] = useState<any>()
    const [long, setLong] = useState<any>()
    const [currentWeatherUrl, setCurrentWeathUrl] = useState<any>('')
    //const [currentWeatherUrl, setCurrentWeathUrl] = useState<any>('https://weatherapi-com.p.rapidapi.com/forecast.json?q=55.9138144%2C37.8065067&days=3')
    const [isLocationDefined, setIsLocationDefined] = useState<boolean>(false)

    const arrFromDaysArr = Array.from(Object.values(daysArray.days))


    useEffect(() => {
        
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords
            setLat(latitude)
            setLong(longitude)
            console.log(`Координаты браузера: ${lat}, ${long}`)

            //перевисать в Redux
            if (lat !== undefined && long !== undefined) {
                setIsLocationDefined(true)
                setCurrentWeathUrl(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${lat}%2C${long}&days=3`)
                console.log(`Текущая ссылка с координатами: ${currentWeatherUrl}`)
                console.log(`состояние isForecastDataFetched = ${isForecastDataFetched}`)

            } else {
                setIsLocationDefined(false)
                console.log('Координаты браузера не определены')
            }
        })
    })


    useEffect(() => {

        if (currentWeatherUrl !== '') {
            const fetchData = async () => {
                try {
                    const forecastData = await forecastFeatherApi.getForecastData(currentWeatherUrl)
                    const astronomyData = await astronomyApi.getAstroData(currentWeatherUrl)
                    console.log(astronomyData)
                    if (!forecastData) {
                        // setIsForecastDataFetched (false)
                        throw new Error('Не удалось получить данные прогноза погоды')
                    }
                    setDaysArray(forecastData.forecast.forecastday)
                    // setIsForecastDataFetched(true)
                    // console.log(`состояние isForecastDataFetched = ${isForecastDataFetched}`)
                } catch (err) {
                    console.log(`Ошибка ${err}`)
                }
            }
            fetchData()
        }

    }, [currentWeatherUrl])

    useEffect(()=>{
        if(daysArray.lenght !== 0){
            setIsForecastDataFetched(true)
        } else {
            setIsForecastDataFetched(false)
        }
    },[daysArray])

    // useEffect(() => {
    //     try {
    //         if (currentWeatherUrl !== '') {
    //             const fetchData = async () => {
    //                 const forecastData = await forecastFeatherApi.getForecastData(currentWeatherUrl)
    //                 const astronomyData = await astronomyApi.getAstroData(currentWeatherUrl)
    //                 console.log(astronomyData)
    //                 if (!forecastData) {
    //                     throw new Error('Не удалось получить данные прогноза погоды')
    //                 }
    //                 //await setForecastData(forecastData.forecast)
    //                 //await setForecastData(forecastData.forecast)
    //                 setDaysArray(forecastData.forecast.forecastday)
    //                 setDaysArray(forecastData.forecast.forecastday)
    //             }
    //             fetchData()
    //         }

    //     } catch (err) {
    //         console.log(`Ошибка ${err}`)
    //     }
    // }, [currentWeatherUrl])

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
            case 'Last Quarter':
                return `hsl(${handleHueValue(120, indexPressureConv(handleHueParam(selectedDay, pressureIndexAverage, pressureIndexPrv))!)}, 90%, 45%)`
            case 'Waning Crescent':
                return `hsl(${handleHueValue(80, indexPressureConv(handleHueParam(selectedDay, pressureIndexAverage, pressureIndexPrv))!)}, 90%, 45%)`;
            default:
                return '#8f8b8b'
        }
    }

    //1 получить геолокацию брацзера
    //2 передать её в качестве стор
    //3 сформировать запрос для дадаты по координатам из стора
    //4 передать запрос в дадату и получить город
    //5 передать город в стор
    //6 свормировать квери-запрос погоды по городу из стор

    //!!!!!при одинаковом поведении давления за прошлый час и за текущий - написать в. текущем часу что давление не изменилось!!!!!!




    // navigator.geolocation.getCurrentPosition(async position => {
    //     const { latitude, longitude } = await position.coords
    //     //setCords({'lat': latitude, 'long': longitude})
    //     setLat(latitude)
    //     setLong(longitude)

    //     //перевисать в Redux
    //     //setCords({latitude, longitude})
    //     console.log(`Координаты браузера: ${lat}, ${long}`)
    // })

    //const handleLat = lat;
    //const handleLong = long;

    useEffect(() => {
        try {
            const fetchPlaceFullDataByChords = async () => {
                const browserPlaceNameDaData = await daDataApi.postDaData({ lat: lat, lon: long });
                console.log(browserPlaceNameDaData)
            }
            fetchPlaceFullDataByChords()
        } catch (e) {
            console.error(e)
        }
    }, [lat, long])

    // useEffect(() => {
    //     setCurrentWeathUrl(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${lat}%2C${long}&days=3`)
    //     console.log(`Текущая ссылка с координатами: ${currentWeatherUrl}`)
    // }, [lat, long])

    // const handlePlaceInfo = daDataApi.postDaData();
    // handlePlaceInfo
    // .then(resp => console.log(resp))

    // useEffect(() => {


    return (
        <SlideContext.Provider value={{
            selectedDay,
        }}>
            {/* <Preloader /> */}
            {!isLocationDefined  || !isForecastDataFetched &&  <Preloader />}
            <Interface
                dayStatus={dayStatus}
                clickForward={clickForward}
                clickBack={clickBack}
                setStyleColor={setStyleColor}
                setRusMonthName={setRusMonthName}
                disableBackBtn={disableBackBtn}
                disableForwardBtn={disableForwardBtn}
                currentHourPressure={currentHourPressure}
                pressureVerdictPrv={pressureVerdictPrv}
                pressureVerdictNext={pressureVerdictNext}
                selectedDay={selectedDay}
                averagePressure={averagePressure}
                pressureVerdictAverage={pressureVerdictAverage}
            />
            {/* <DayStatusBar
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
            /> */}
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
        astroData: store.astroData,
        browserPlaceNameDaData: store.browserPlaceNameDaData
    }
}


const mapDispatchToProps = (dispatch: (arg0: { type: string | number; payload?: object | number; }) => object) => ({
    setDaysArray: (day: object) => dispatch(setDaysArray(day)),
    setSelectedDayAction: (day: number) => dispatch(setSelectedDay(day))
});

export default connect(mapStateToProps, mapDispatchToProps,)(App);
export { App }

