export default function sessionReducer(state = { openSession: false }, action) {
    switch (action.type) {
        case 'OPEN_SESSION':
            return state = {
                openSession: true
            };
        case 'CLOSE_SESSION':
            return state = {
                openSession: false
            };
        default:
            return state
    }
}