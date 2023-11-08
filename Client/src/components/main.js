import React, { useState } from 'react';
import Form from '../forms/main';
import {Container} from './style';

function Todo() {
    const [input, setInput] = useState('');
    console.log(input, "input");

    return <Container>
            <h2>List of Todos</h2>
            
            <Form input={input} setInput={setInput}/>
        </Container>
}

export default Todo;