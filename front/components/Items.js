import React from 'react';
import { List } from 'antd';
import {useSelector} from 'react-redux'
import Item from './Item';

const Items = () => {
    const {toDoLists} = useSelector(state => state.list)
    return(
        <List 
            itemLayout = "horizontal"
            dataSource = {toDoLists}
            renderItem = {toDoLists => (
                <Item key={toDoLists.id} toDoLists={toDoLists} />
        )}>
        </List>
    )  
};

export default Items;