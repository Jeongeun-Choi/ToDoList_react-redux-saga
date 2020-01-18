import { all, delay, fork, takeLatest, put } from 'redux-saga/effects';
import { INPUT_TODO_FAILURE, INPUT_TODO_REQUEST, INPUT_TODO_SUCCESS, MODIFY_TODO_FAILURE, MODIFY_TODO_REQUEST, MODIFY_TODO_SUCCESS, DELETE_TODO_FAILURE, DELETE_TODO_REQUEST, DELETE_TODO_SUCCESS, CLICK_MODIFY_SUCCESS, CLICK_MODIFY_FAILURE, CLICK_MODIFY_REQUEST } from '../reducers/list';

function* inputList(action) {
    try{
        yield delay(1300);
        yield put({
            type: INPUT_TODO_SUCCESS,
            data : action.data
        });
    }catch{
        console.error(e);
        yield put({
            type: INPUT_TODO_FAILURE
        });
    }
}

function* watchInputList() {
    yield takeLatest(INPUT_TODO_REQUEST, inputList)
}

function* modifyList(action) {
    try{
        yield delay(1300);
        yield put({
            type: MODIFY_TODO_SUCCESS,
            data: action.data
        });
    }catch{
        console.error(e);
        yield put({
            type: MODIFY_TODO_FAILURE
        });
    }
}

function* watchModifyList() {
    yield takeLatest(MODIFY_TODO_REQUEST, modifyList)
}

function* deleteList(action) {
    try{
        yield delay(1300);
        yield put({
            type: DELETE_TODO_SUCCESS,
            data : action.data
        });
    }catch{
        console.error(e);
        yield put({
            type: DELETE_TODO_FAILURE
        });
    }
}

function* watchDeleteList() {
    yield takeLatest(DELETE_TODO_REQUEST, deleteList)
}

function* clickModifyButton(){
    try{
        yield delay(1000);
        yield put({
            type: CLICK_MODIFY_SUCCESS
        }) 
    } catch{
        console.error(e);
        yield put({
            type: CLICK_MODIFY_FAILURE
        })
    }  
}

function* watchClickModifyButton(){
    yield takeLatest(CLICK_MODIFY_REQUEST, clickModifyButton)
}


export default function* userSaga() {
    yield all([
        fork(watchInputList),
        fork(watchModifyList),
        fork(watchDeleteList),
        fork(watchClickModifyButton)
    ])
}