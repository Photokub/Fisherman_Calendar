//описание по индексу поведения давления текущего часа к предыдущему
export const handlePastPressureVerdict = (press: number) => {
    switch (press) {
        case 1:
            return 'давление высокое';
        case 2:
            return 'идёт повышение высокого давления';
        case 3:
            return 'идёт понижение высокого давления';
        case 4:
            return 'давление нормальное';
        case 5:
            return 'идёт повышение низкого давления';
        case 6:
            return 'идёт понижение низкого давления';
        case 7:
            return 'давление низкое';
    }
}