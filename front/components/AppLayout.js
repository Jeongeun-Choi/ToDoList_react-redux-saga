import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ToDoList = styled.div`
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const AppLayout = ({children}) => {
    return(
        <ToDoList>
            {children}
        </ToDoList>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node,
};

export default AppLayout;