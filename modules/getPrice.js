function getPrice(price){
    switch (price){
        case '0':
            return 'Not available'
        case '1':
            return '$'
        case '2':
            return '$$'
        case '3':
            return '$$$'
        default:
            return 'Not available'
    }
}

module.exports = getPrice;