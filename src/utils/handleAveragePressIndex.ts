//получение индекса давления из среднего за сутки
export function handleAveragePressIndex(avr: number) {
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