import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Button } from 'antd';
import { DELETE_TODO_REQUEST } from '../reducers/list';
import ModifyForm from './ModifyForm'; 

const Item = () => {
    const dispatch = useDispatch();
    const [isClickModify, setClickModify] = useState(false);
    const { toDoLists, isDeleting } = useSelector(state => state.list);

    const onClickModify = useCallback((e) => {
        setClickModify(!isClickModify)
    });

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
                    <ModifyForm />
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