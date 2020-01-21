import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Button, Input } from 'antd';
import { DELETE_TODO_REQUEST, CLICK_MODIFY_REQUEST, MODIFY_TODO_REQUEST } from '../reducers/list';
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
    // const [isClickModify, setClickModify] = useState(false);
    const { isClickModify } = useSelector(state => state.list);
    const [isDeleting, setIsDeleting] = useState(false)
    const [isModify, setIsModify] = useState(false)
    const [isModifying, setIsModifying] = useState(false)
    const [modifyText, setModifyText] = useState('');

    useEffect(()=>{
        setIsDeleting(false)
        setIsModifying(false)
    }, [toDoLists.id, toDoLists.isClick]);

    const onClickModify = useCallback((id) => (e) => {
        setIsModify(true)
        dispatch({
            type: CLICK_MODIFY_REQUEST,
            data: id
        })
    }, [toDoLists]);
    
    const onClickCancel = () => {
        setIsModify(false)
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
    <ItemForm>
    {isClickModify ? <><Input onChange={onChangeListText} value={modifyText} style={{width:300}}/></> : <>{toDoLists.text}</>}
    <List.Item>
    {
        isClickModify
        ? 
        <><Button type="primary" onClick={modifyList(toDoLists.id, modifyText)} style={{background:"darkgray", border:"darkgray"}}>확인</Button><Button onClick={onClickCancel}>취소</Button></>
        : 
        <>
        <Button type="primary" onClick={onClickModify(toDoLists.id)} loading={isModify} style={{background:"gray", border:"gray"}}>수정</Button>
        <Button type="danger" onClick={deleteList(toDoLists.id)} loading={isDeleting}>삭제</Button>
        </>
    }
    </List.Item>
    </ItemForm>
            
         
    );
};


export default Item;