export const FILL_PEOPLE = 'set_people'
export const FILL_PROFILE = 'set_profile'
export const FILL_ROWS = 'set_rows'
export const SET_PAGINATION = 'set_pagination' 

export const fillPeople = (payload) => {
    return {
        type: FILL_PEOPLE,
        payload
    }
}

export const fillProfile = (payload) => {
    return {
        type: FILL_PROFILE,
        payload
    }
}

export const fillRows = (payload) => {
    return {
        type: FILL_ROWS,
        payload
    }
}

export const setPagination = (payload) => {
    return {
        type: SET_PAGINATION,
        payload
    }
}