import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ToDoListForm from './ToDoListForm';
import Item from './Item';

const Title = styled.h1`
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 41px;
`;

const AppLayout = () => {
    return(
        <>
            <Title>
                정은이가 해야할 일
            </Title>
            <ToDoListForm />
            <Item/>
        </>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node,
};

export default AppLayout;