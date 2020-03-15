import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Button, Input } from 'antd';
import { DELETE_TODO_REQUEST, MODIFY_TODO_REQUEST } from '../reducers/list';
import styled from 'styled-components';

const ItemForm = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    text-align: center;
`;

const Item = ({toDoLists}) => {
    const dispatch = useDispatch();
    const {isModifying} = useSelector(state => state.list);
    const [isDeleting, setIsDeleting] = useState(false)
    const [isModify, setIsModify] = useState(false)
    const [modifyText, setModifyText] = useState(toDoLists.text);

    useEffect(()=>{
        setIsDeleting(false)
        setIsModify(false)
    }, [toDoLists.id]);

    const onClickModify = useCallback((e) => {
        setIsModify(true);
    }, []);
    
    const onClickCancel = useCallback(() => {
        setIsModify(false);
    }, []);

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
        setIsModify(false)
    }, [modifyText]);

    const onChangeListText = (e) => {
        setModifyText(e.target.value)
    };

    return(
    <ItemForm>
    {isModify ? <><Input onChange={onChangeListText} value={modifyText} style={{width:300}}/></> : <>{toDoLists.text}</>}
    <List.Item>
    {
        isModify
        ? 
        <><Button type="primary" onClick={modifyList(toDoLists.id, modifyText)}>확인</Button><Button onClick={onClickCancel}>취소</Button></>
        : 
        <>
        <Button type="primary" onClick={onClickModify}>수정</Button>
        <Button onClick={deleteList(toDoLists.id)}>삭제</Button>
        </>
    }
    </List.Item>
    </ItemForm>
            
         
    );
};


export default Item;