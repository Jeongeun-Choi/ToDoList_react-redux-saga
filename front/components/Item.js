import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Button } from 'antd';
import { DELETE_TODO_REQUEST, CLICK_MODIFY_REQUEST } from '../reducers/list';
import ModifyForm from './ModifyForm'; 

const Item = () => {
    const dispatch = useDispatch();
    // const [isClickModify, setClickModify] = useState(false);
    const { toDoLists, isClickModify } = useSelector(state => state.list);
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(()=>{
        setIsDeleting(false)
    }, [toDoLists.id]);

    const onClickModify = useCallback((e) => {
        dispatch({
            type: CLICK_MODIFY_REQUEST
        })
    }, []);

    const deleteList = (id) => (e) => {
        dispatch({
            type : DELETE_TODO_REQUEST,
            data : id
        })
    };

    return(
        <List 
            itemLayout = "horizontal"
            dataSource = {toDoLists}
            renderItem = {item => (
                <>
                <List.Item>{item.text}
                {
                    isClickModify 
                    ? 
                    <ModifyForm item={item}/>
                    : 
                    <>
                    <Button type="primary" onClick={onClickModify}>수정</Button>
                    <Button type="danger" onClick={deleteList(item.id)} loading={isDeleting}>삭제</Button>
                    </>
                }
                </List.Item>
                </>
            )}
        />  
    );
};


export default Item;