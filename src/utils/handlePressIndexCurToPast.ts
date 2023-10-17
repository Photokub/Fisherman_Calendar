//получение индекса состояния давления на текущий час по отношению к предыдущему
export function handlePressIndexCurToPast(cur: number, prv: number, index: number) {
    if (cur === 760) {
        if (prv !== undefined || null) {
            if (cur <= prv) {
                return 3
            } else {
                if (cur === prv) {
                    console.log(`Давление совпало. Будет возвращён pressureIndexPrv ${index}`)
                    return index
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
                        console.log(`Предыдущее давление совпало. Будет возвращён pressureIndexPrv ${index}`)
                        return index
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
                        console.log(`Предыдущее давление совпало. Будет возвращён pressureIndexPrv ${index}`)
                        return index
                    } else {
                        return 5
                    }
                }
            }
        }
    }
}