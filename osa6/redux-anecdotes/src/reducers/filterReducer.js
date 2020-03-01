export const set = (filter) => {
    return {
        type: 'SET FILTER',
        data: { filter }
    }
}

const reducer = (state = '', action) => {
    switch (action.type) {
        case 'SET FILTER': {
            const filter = action.data.filter
            return filter
        }
        default:
            return state
    }
}

export default reducer