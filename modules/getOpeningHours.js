function getOpeningHours(result) {
    let date = new Date();
    let day = date.getDay();

    switch (day){
        case 0:
            return result.sunday
        case 1:
            return result.monday
        case 2:
            return result.tuesday
        case 3:
            return result.wednesday
        case 4:
            return result.thursday
        case 5:
            return result.friday
        case 6:
            return result.sunday
        default:
            return 'Not available'
    }
}

module.exports = getOpeningHours;