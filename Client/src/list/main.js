import React from 'react';
import axios from '../axios';
import { ListContainer, Row, Text , DeleteIcon} from './style';

function List({todos, fetchData}) {
    console.log(todos, "hi")

    const updateTodo = async (id) => {
        try {
            const response = await axios.put(`/todos/${id}`, {id,})
            
            fetchData();
            return response.data.json;
        }catch (err){
            console.error(err.message);
        }
    }

    return (
        <div>
            <ListContainer>
                {todos?.map((todo) => (
                    <Row key={todo._id}>
                        <Text 
                        onClick={() => updateTodo(todo._id)}
                        isCompleted={todo.completed}
                        >{todo.text}</Text>
                        <DeleteIcon>X</DeleteIcon>
                    </Row>
                ))}
            </ListContainer>
        </div>
    )
}

export default List;