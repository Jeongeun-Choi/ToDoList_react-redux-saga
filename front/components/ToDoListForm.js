import React, { useState, useCallback  } from 'react';
import { Input, Form, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { INPUT_TODO_REQUEST } from '../reducers/list';

const ToDoListForm = () => {
    const [inputText, setInputText] = useState('');
    const { isInputting } = useSelector(state => state.list);
    const dispatch = useDispatch();

    const onSubmitInput = useCallback((e) => {
        e.preventDefault();
        if(!inputText || !inputText.trim()){
            alert("공백 금지!");
        }else{
            dispatch({
                type: INPUT_TODO_REQUEST,
                data: inputText
            });
            setTimeout(() => {
                setInputText('');
            } , 1300);
        }
    },[inputText]);

    const onChangeListText = useCallback((e) => {
        setInputText(e.target.value)
    }, []);

    return(
        <div>
            <Form onSubmit={onSubmitInput}>
                <Input style={{verticalAlign: 'middle', width: 300, marginLeft: 40}} onChange={onChangeListText} value={inputText}/>     
                <Button type="primary" htmlType="submit" loading={isInputting}>입력</Button>
            </Form>     
        </div>
    );
};

export default ToDoListForm;