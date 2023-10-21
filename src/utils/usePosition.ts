import {useEffect, useState} from "react";

export const usePosition = () => {
    const [position, setPosition] = useState({});
    const [error, setError] = useState<string>('');

    // const onChange = ({latitude, longitude}: any) => {
    //     // Здесь мы могли бы сохранить весь объект position, но для
    //     // ясности давайте явно перечислим, какие свойства нас интересуют.
    //     setPosition({latitude, longitude});
    // };

    const onCurrentPos = (pos: any) => {
        // Здесь мы могли бы сохранить весь объект position, но для
        // ясности давайте явно перечислим, какие свойства нас интересуют.
        setPosition(pos.coords);
    };

    const onError = (error: any) => {
        setError(error.message);
    };

    // function success(pos: any) {
    //     const crd = pos.coords;
    //
    //     console.log("Ваше текущее местоположение:");
    //     console.log(`Широта: ${crd.latitude}`);
    //     console.log(`Долгота: ${crd.longitude}`);
    //     console.log(`Плюс-минус ${crd.accuracy} метров.`);
    // }

    useEffect(() => {
        const geo = navigator.geolocation;

        if (!geo) {
            setError('Геолокация не поддерживается браузером');
            return;
        }

        let currentPos:any = geo.getCurrentPosition(onCurrentPos)

        // Подписываемся на изменение геопозиции браузера.
        //let watcher = geo.watchPosition(onChange, onError);

        // В случае, если компонент будет удаляться с экрана
        // производим отписку от слежки, чтобы не засорять память.
        return () => geo.clearWatch(currentPos);
        //return () => geo.clearWatch(watcher);
    }, []);

    return { ...position, error };
}