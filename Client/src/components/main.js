import React, { useEffect, useState } from 'react';
import axios from '../axios';
import Form from '../forms/main';
import {Container} from './style';

function Todo() {
    const [input, setInput] = useState('');
    const [todos, setTodos] = useState([]);

//    console.log(input, "input");

    const fetchData = async () => {
        try {
            const response = await axios.get('/todos');
            setTodos(response.data);
        }catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addTodo = async(e) => {
        e.preventDefault();
        if (input.length === 0)
            return null;

        await axios.post('/todos', [{
            ...todos,
            text: input,
            completed: false
        }])

        fetchData();
        setInput('');

        console.log('AddedTodos');
    }

    //console.log(todos, "todos");

    return (
        <Container>
            <h2>List of Todos</h2>
            
            <Form input={input} setInput={setInput} addTodo={addTodo}/>
        </Container>
        );
}

export default Todo;