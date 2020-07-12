function filterResults(type, filter, direction, results){
    if (filter === 'alpha'){
        if (type === 'restaurant') results.sort((a, b) => a.name.localeCompare(b.name))
        else if (type === 'blog') results.sort((a, b) => a.title.localeCompare(b.title))
        else if (type === 'user') results.sort((a, b) => a.display_name.localeCompare(b.display_name))

        if (direction == 'ascending') return results.reverse()
        else if (direction === 'descending') return results
    }
    else if (filter === 'latest'){
        results.sort((a, b) => b.date_modified - a.date_modified);

        if (direction == 'ascending') return results.reverse()
        else if (direction === 'descending') return results
    }
    else if (filter === 'rating'){
        results.sort((a, b) => {
            if (a.rating == 'Not yet rated') a.rating = 0
            if (b.rating == 'Not yet rated') b.rating = 0
            return b.rating - a.rating
        });

        if (direction == 'ascending') return results.reverse()
        else if (direction === 'descending') return results
    }
    else if (filter === 'publisher'){
        results.sort((a, b) => b.user_id - b.user_id)

        if (direction == 'ascending') return results.reverse()
        else if (direction === 'descending') return results
    }
    else if (filter === 'location'){
        results.sort((a, b) => b.district_id - a.district_id);

        if (direction == 'ascending') return results.reverse()
        else if (direction === 'descending') return results
    }
}

module.exports = filterResults;