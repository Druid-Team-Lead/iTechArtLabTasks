import { ACTION_CHANGE_FIRST_NAME, ACTION_CHANGE_SECOND_NAME, ACTION_CHANGE_CITY } from './actionConstants'

export const changeFirstName = (newFirstName) => {
    return {
        type: ACTION_CHANGE_FIRST_NAME,
        payload: newFirstName
    };
}

export const changeSecondName = (newSecondName) => {
    return {
        type: ACTION_CHANGE_SECOND_NAME,
        payload: newSecondName
    };
}

export const changeCity = (newCity) => {
    
}