// Get the current day in DD/MM/YY format
let updateDate = function(date) {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();

    let MM = date.getMinutes();
    let HH = date.getHours();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (MM < 10) {
        MM = '0' + MM;
    }
    if (HH < 10) {
        HH = '0' + HH;
    }
    return HH + ':' + MM + ' ' + dd + '/' + mm + '/' + yyyy;
}

module.exports = updateDate;