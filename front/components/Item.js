import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Button, Input } from 'antd';
import { DELETE_TODO_REQUEST, CLICK_MODIFY_REQUEST, MODIFY_TODO_REQUEST } from '../reducers/list';
import ModifyForm from './ModifyForm'; 

const Item = ({toDoLists}) => {
    const dispatch = useDispatch();
    // const [isClickModify, setClickModify] = useState(false);
    const { isClickModify } = useSelector(state => state.list);
    const [isDeleting, setIsDeleting] = useState(false)
    const [isModify, setIsModify] = useState(false)
    const [isModifying, setIsModifying] = useState(false)
    const [modifyText, setModifyText] = useState('');

    useEffect(()=>{
        setIsDeleting(false)
        setIsModifying(false)
    }, [toDoLists.id, modifyText]);

    const onClickModify = useCallback(() => {
        setIsModify(true)
        dispatch({
            type: CLICK_MODIFY_REQUEST
        })
    }, []);
    
    const onClickCancel = () => {
        setIsModifying(false)
        dispatch({
            type: CLICK_MODIFY_REQUEST
        })
    };

    const deleteList = useCallback((id) => (e) => {
        setIsDeleting(true)
        dispatch({
            type : DELETE_TODO_REQUEST,
            data : id
        })
    }, [toDoLists]);

    const modifyList = useCallback((id, modifyText) => (e) => {
        e.preventDefault();
        if(!modifyText || !modifyText.trim()){
            alert("공백 금지!");
        } else{
            dispatch({
                type: MODIFY_TODO_REQUEST,
                data: {
                    id,
                    modifyText
                }
            });
        }
        setIsModifying(false)
    }, [modifyText]);

    const onChangeListText = (e) => {
        setModifyText(e.target.value)
    };

    return(
    <>
    <List.Item>{toDoLists.text}
    {
        isClickModify
        ? 
        <><Input onChange={onChangeListText} value={modifyText}/><Button type="primary" onClick={modifyList(toDoLists.id, modifyText)}>확인</Button><Button onClick={onClickCancel}>취소</Button></>
        : 
        <>
        <Button type="primary" onClick={onClickModify} loading={isModifying}>수정</Button>
        <Button type="danger" onClick={deleteList(toDoLists.id)} loading={isDeleting}>삭제</Button>
        </>
    }
    </List.Item>
    </>
            
         
    );
};


export default Item;