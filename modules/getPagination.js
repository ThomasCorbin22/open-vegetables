function getPagination(route, page, number){
    let api = route
    let filter_options
    let current = {value: page}
    
    let first = {value:1, active:true}
    if (first.value === current.value) first.active = false

    let previous = {value:current.value - 1, active:true}
    if (previous.value === 0) previous.active = false

    let last = {value:Math.ceil(number / 10), active:true}
    if (last.value === current.value) last.active = false

    let next = {value:current.value + 1, active:true}
    if (next.value > last.value) next.active = false

    if (route = 'restaurant') filter_options = ['latest', 'rating', 'location']
    else if (route = 'blogs') filter_options = ['latest', 'rating', 'publisher']

    return {
        api,
        first,
        current,
        previous,
        next,
        last,
        filter_options
    }
}

module.exports = getPagination;