//присвоение вычисления по индексу
export const indexPressureConv = (pressureIndex: number) => {
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