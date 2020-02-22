export const USER_INFORMATION_ADDED = 'USER_INFORMATION_ADDED';
export const APPROVE_PHONE = 'APPROVE_PHONE';

export const userInformationAdded = (data) => ({
    type: USER_INFORMATION_ADDED,
    payload: {data}
})

export const approvePhone = () => ({
    type: APPROVE_PHONE
})
