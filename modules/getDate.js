// Get the current day in DD/MM/YY format
let getDate = function(date) {
    let dd = date.getDay();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
}

module.exports = getDate;