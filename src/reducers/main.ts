import moment from 'moment';
import {
    MAIN_MESSAGES_LIST_FETCH,
    MAIN_MESSAGES_LIST_SUCCESS,
    MAIN_MESSAGES_LIST_FAILED,
    
    MAIN_SEND_MESSAGE,

    MAIN_SET_USER_NAME,
    TAction,
} from '../actions/mainActions';
import { MessagesList } from '../types';

export type TState = {
    username: string,
    messagesList: MessagesList | null,
    messengerError: Error | null,
}

const initialState: TState = {
    username: 'Anonim',
    messagesList: null,
    messengerError: null,
}

const main = (state = initialState, action: TAction) => {
    switch (action.type) {
        case MAIN_MESSAGES_LIST_FETCH: {
            const newState = Object.assign({}, state);
            newState.messagesList = null;
            return newState;
        }
        case MAIN_MESSAGES_LIST_SUCCESS: {
            const newState = Object.assign({}, state);
            newState.messagesList = action.messagesList;
            return newState;
        }
        case MAIN_MESSAGES_LIST_FAILED: {
            const newState = Object.assign({}, state);
            newState.messengerError = action.error;
            return newState;
        }
        case MAIN_SEND_MESSAGE: {
            const newState = Object.assign({}, state);
            const messageList = [
                ...newState.messagesList ? newState.messagesList : [],
                {
                    time: moment().format('HH:mm'),
                    text: action.messageText,
                    sender: newState.username,
                }
            ]
            newState.messagesList = messageList;
            return newState;
        }
        case MAIN_SET_USER_NAME: {
            const newState = Object.assign({}, state);
            newState.username = action.username;
            return newState;
        }
        default: {
            return state;
        }
    }

};

export default main;