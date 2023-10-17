//получение индекса состояния давления на текущий час по отношению к следующему
export function handlePressIndexCurToNext(cur: number, nxt: number, index: number) {
    if (cur === 760) {
        if (nxt !== undefined || null) {
            if (cur <= nxt) {
                return 2
            } else {
                if (cur === nxt) {
                    console.log(`Давление совпало. Будет возвращён pressureIndex ${index}`)
                    return index
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
                        console.log(`Следующее давление совпало. Будет возвращён pressureIndex ${index}`)
                        return index
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
                        console.log(`Следующее давление совпало. Будет возвращён pressureIndex ${index}`)
                        return index
                    } else {
                        return 6
                    }
                }
            }
        }
    }
}