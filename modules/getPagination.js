function getPagination(route, filter, page, number){
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

    if (route = 'restaurant') filter_options = [{value: 'alpha', active:false}, {value: 'latest', active:false}, {value: 'rating', active:false}, {value: 'location', active:false}]
    else if (route = 'blogs') filter_options = [{value: 'alpha', active:false}, {value: 'latest', active:false}, {value: 'rating', active:false}, {value: 'publisher', active:false}]

    for (let i = 0; i < filter_options.length; i++){
        if (filter == filter_options[i].value) filter_options[i].active = true
    }

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