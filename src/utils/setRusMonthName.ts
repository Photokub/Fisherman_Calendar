//установка названий месяцев по-русски
export const setRusMonthName = (monthNumber: string) => {
    switch (monthNumber) {
        case '01':
            return 'Января';
        case '02':
            return 'Февраля';
        case '03':
            return 'Марта';
        case '04':
            return 'Апреля';
        case '05':
            return 'Мая';
        case '06':
            return 'Июня';
        case '07':
            return 'Июля';
        case '08':
            return 'Августа';
        case '09':
            return 'Сентября';
        case '10':
            return 'Октября';
        case '11':
            return 'Ноября';
        case '12':
            return 'Декабря';
        default:
            return 'Этого месяца'
    }
}