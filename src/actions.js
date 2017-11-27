export const FILL_PEOPLE = 'set_people'
export const FILL_PROFILE = 'set_profile'

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