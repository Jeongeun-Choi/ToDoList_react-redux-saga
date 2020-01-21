import React from 'react';
import styled from 'styled-components';
import ToDoListForm from '../components/ToDoListForm';
import Items from '../components/Items';

const Title = styled.h1`
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 41px;
`;

const Main = () => {
    return(
        <>
            <Title>
                할 일
            </Title>
            <ToDoListForm />
            <Items/>
        </>
    );
};
export default Main;