import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Input } from 'antd';
import { MODIFY_TODO_REQUEST, CLICK_MODIFY_REQUEST } from '../reducers/list';

const ModifyForm = ({item}) => {
    const dispatch = useDispatch();
    const [modifyText, setModifyText] = useState('');

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
    }, [modifyText]);

    const onChangeListText = useCallback((e) => {
        setModifyText(e.target.value)
    }, []);

    const onClickModify = useCallback((e) => {
        dispatch({
            type: CLICK_MODIFY_REQUEST
        })
    }, []);

    return (
        <div>
            <Form onSubmit={modifyList(item.id, modifyText)}>
                <Input onChange={onChangeListText} value={modifyText}/><Button type="primary" htmlType="submit">확인</Button><Button onClick={onClickModify}>취소</Button>
            </Form> 
        </div>
    );
};

export default ModifyForm;