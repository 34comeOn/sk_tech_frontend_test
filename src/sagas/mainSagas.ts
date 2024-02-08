import { REQUESTS_DELAY } from '../constants/index';
import { all, takeEvery, put, delay, call, select } from 'typed-redux-saga';
import { mainActions } from '../actions';
import { getMessages, postMessage } from '../api/index';

export function* mainMessagesList(): Generator<any, void, any> {
    try {
        const [data, status] = yield call(getMessages);
        const storedMessagesList = yield select(({main}) => main.messagesList);  

        if (!status) {
            throw new Error('Bad get request')
        }
        if (storedMessagesList === null) {
            yield put(mainActions.mainMessagesListSuccess(data));
        } else if (data.length > storedMessagesList.length) {
            yield put(mainActions.mainMessagesListSuccess(data));
        }

        yield delay(REQUESTS_DELAY);
        yield (mainMessagesList());
        
    } catch (error) {
        yield put(mainActions.mainMessagesListFailed(error));
        console.log('loading error', error);
    }
}

export function* sendMessage(): Generator<any, void, any> {
    try {
        const storedMessagesList = yield select(({main}) => main.messagesList);  
        const status = yield postMessage(storedMessagesList.at(-1));
        if (!status) {
            throw new Error('Bad post request')
        }
    } catch (error) {
        yield put(mainActions.mainMessagesListFailed(error));
        console.log('sending error', error);
    }
}

export function* watchMainMessagesList(): Generator<any, void, any> {
    yield takeEvery(mainActions.MAIN_MESSAGES_LIST_FETCH, mainMessagesList);
}

export function* watchSendMessage(): Generator<any, void, any> {
    yield takeEvery(mainActions.MAIN_SEND_MESSAGE, sendMessage);
}

export default function* rootSaga(): Generator<any, void, any> {
    yield all([
        watchMainMessagesList(),
        watchSendMessage(),
    ]);
}