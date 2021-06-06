import React, {useState, useRef, useEffect} from "react";
import * as PropTypes from "prop-types";
import TodoList from "./TodoList";
import uuidv4 from 'uuid/dist/v4';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import Art from "./img/orange-art.jpg";
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faCoffee, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./style.css";



library.add(fab, faCheckSquare, faCoffee, faPlus, faTrashAlt);




const LOCAL_STORAGE_KEY = 'todoApp.todos';



// BEGINNING OF REACT APP
function App() {
    const [todos, setTodos] = useState([])
    const todoNameRef = useRef();

    // THIS EFFECT IS ALLOWING US TO LOAD OUR STORED JSON TODOS IF ANY
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedTodos) setTodos(storedTodos)
    }, []);

    // THIS EFFECT IS STORING THE TODOS TO BE PULLED NEXT TIME THE PAGE LOADS
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos]);

    /* THIS FUNCTION IS TAKING THE PARAMETER OF ID TO LOCATE THE MATCHING OBJECT AND IT
    TOGGLES THE CHECKMARK STATE OF COMPLETION*/
    function toggleTodo(id) {
        const newTodos = [...todos];
        const todo = newTodos.find(todo => todo.id === id);
        todo.complete = !todo.complete;
        setTodos(newTodos);
    }

    function handleClear(){
        const newTodos = todos.filter(todo => !todo.complete)
        setTodos(newTodos);
    }

    //THIS FUNCTION MAKING THE ADD BUTTON USE THE INPUT TO CREATE NEW TO DO OBJECTS
    function handleAddTodo (e){
       const name = todoNameRef.current.value;
        if (name === "") return;
        setTodos(prevTodos => {
            return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
        })
        todoNameRef.current.value = null
    }

  return (
      <>
      <div class="d-flex justify-content-center" id="title">
        <h1>2 DO LIST</h1>
      </div>
      <div class="d-flex justify-content-center" id="card-container" >
          <Card style={{ width: '18rem' }} id="card">
              <Card.Img variant="top" src={Art}/>
              <Card.Body>
                  <Card.Title>What is there to do today?</Card.Title>
                  <Card.Text class="text-muted mb-4">
                      Type any tasks or to dos and click add, check those that are complete and delete them.
                  </Card.Text>
                  <TodoList todos = {todos} toggleTodo = {toggleTodo} />
                  <Card.Body className="footerPadding">
                      <input id="input" placeholder=" Enter your task" ref={todoNameRef} type="text"/>
                      <div className="d-flex row justify-content-center">
                          <Button className="add col-2" onClick={handleAddTodo} variant="primary" id="addButton"><FontAwesomeIcon icon="plus" /></Button>
                          <Button className="delete col-2" onClick={handleClear} variant="danger" id="clearButton"><FontAwesomeIcon icon="trash-alt" /></Button>
                      </div>
                      <div className= "row d-flex justify-content-center">
                          <div className="leftTodo col-6 text-center">{todos.filter(todo => !todo.complete).length} left to do </div>
                      </div>

                  </Card.Body>

              </Card.Body>
          </Card>
      </div>
        {/*<TodoList todos = {todos} toggleTodo = {toggleTodo} />*/}
        {/*<input ref={todoNameRef} type="text"/>*/}
        {/*<button onClick={handleAddTodo}>Add To Do</button>*/}
        {/*<button onClick={handleClear}>Clear Completed ToDos</button>*/}

      </>

  )
}


export default App;
