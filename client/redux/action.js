export const USER_INFORMATION_ADDED = 'USER_INFORMATION_ADDED';
export const APPROVE_PHONE = 'APPROVE_PHONE';
export const CREATE_REQUEST = 'CREATE_REQUEST';
export const CLOSE_REQUEST = 'CLOSE_REQUEST'

export const userInformationAdded = (data) => ({
    type: USER_INFORMATION_ADDED,
    payload: {data}
})

export const approvePhone = () => ({
    type: APPROVE_PHONE
})

export const createRequest = () => ({
    type: CREATE_REQUEST
})

export const closeRequest = () => ({
    type: CLOSE_REQUEST
})