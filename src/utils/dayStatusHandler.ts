//установщик статуса дня
export const dayStatusHandler = (day: any, setter: any) => {
    switch (day) {
        case 0:
            return setter("Сегодня")
        case 1:
            return setter("Завтра")
        case 2:
            return setter("Послезавтра")
    }
}