import produce from 'immer';

//입력 요청, 입력 성공, 입력 실패
//수정 요청, 수정 성공, 수정 실패
//삭제 요청, 삭제 성공, 삭제 실패

export const initialState = {
    isClickModify: false,
    isInputting: false,     //입력 시도중
    inputted: false,        //입력 완료
    inputErrorReason: '',   //입력 실패
    isModifying: false,     //수정 시도중
    modified: false,        //수정 성공
    modifyErrorReason: '',  //수정 실패 사유
    isDeleting: false,      //삭제 시도중
    deleted: false,         //삭제 성공
    deleteErrorReason: '',  //삭제 실패 사유
    toDoLists: [{
        id: 1,
        text: '자기',
        isClick: false
    },
    {
        id: 2,
        text: '밥 먹기',
        isClick: false
    }],
    maxId :2,
};

export const INPUT_TODO_REQUEST = 'INPUT_TODO_REQUEST';
export const INPUT_TODO_SUCCESS = 'INPUT_TODO_SUCCESS';
export const INPUT_TODO_FAILURE = 'INPUT_TODO_FAILURE';

export const MODIFY_TODO_REQUEST = 'MODIFY_TODO_REQUEST';
export const MODIFY_TODO_SUCCESS = 'MODIFY_TODO_SUCCESS';
export const MODIFY_TODO_FAILURE = 'MODIFY_TODO_FAILURE';

export const DELETE_TODO_REQUEST = 'DELETE_TODO_REQUEST';
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
export const DELETE_TODO_FAILURE = 'DELETE_TODO_FAILURE';

export const CLICK_MODIFY_BUTTON = 'CLICK_MODIFY_BUTTON';
// export const UNCLICK_MODIFY_BUTTON = 'UNCLICK_MODIFY_BUTTON';

export default (state = initialState, action) => {
    return produce (state, draft => {
        switch(action.type){
            case INPUT_TODO_REQUEST: {
                draft.isInputting = true;
                draft.inputErrorReason = '';
                break;
            }
            case INPUT_TODO_SUCCESS: {
                draft.isInputting = false;
                draft.inputted = true;
                draft.toDoLists.push({id: draft.maxId +1 , text : action.data, isClick: false});
                draft.maxId += 1;
                break;
            }
            case INPUT_TODO_FAILURE: {
                draft.isInputting = false;
                draft.inputted = false;
                draft.inputErrorReason = action.error;
                break;
            }
            case MODIFY_TODO_REQUEST: {
                draft.isModifying = true;
                draft.modifyErrorReason = '';
                break;
            }
            case MODIFY_TODO_SUCCESS: {
                draft.isModifying = false;
                draft.modified = true;
                const index = draft.toDoLists.findIndex(v=> v.id === action.data.id);
                draft.toDoLists[index].text = action.data.modifyText;
                draft.isLoading = false;
                break;
            }
            case MODIFY_TODO_FAILURE: {
                draft.isModifying = false;
                draft.modified = false;
                draft.modifyErrorReason = action.error;
                break;
            }
            case DELETE_TODO_REQUEST: {
                draft.isDeleting = true;
                draft.deleteErrorReason = '';
                break;
            }
            case DELETE_TODO_SUCCESS: {
                draft.isDeleting = false;
                draft.deleted = true;
                const index = draft.toDoLists.findIndex(v=> v.id === action.data);
                draft.toDoLists.splice(index,1);
                // draft.toDoLists = draft.toDoLists.filter(v => v.id !== action.data)
                break;
            }
            case DELETE_TODO_FAILURE: {
                draft.isDeleting = false;
                draft.deleted = false;
                draft.deleteErrorReason = action.error;
                break;
            }
            case CLICK_MODIFY_BUTTON: {
                !draft.isClickModify;
                break;
            }
            // case UNCLICK_MODIFY_BUTTON: {
            //     draft.isClickModifyButton = false;
            //     break;
            // }
            default:{
                break;
            }
        }
    });
};