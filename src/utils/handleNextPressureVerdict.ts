//описание по индексу поведения давления текущего часа к следующему
export const handleNextPressureVerdict = (press: number) => {
    switch (press) {
        case 1:
            return 'давление будет высокое';
        case 2:
            return 'будет повышение высокого давления';
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