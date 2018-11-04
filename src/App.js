import React, { Component } from 'react';
import TodoItem from './todo-item'

import './style.css'

class App extends Component {
	constructor(props){
		super(props);
		this.state={
			todos: [
				{name: 'item2', rename_input: ''},
				{name: 'item1', rename_input: ''}
			],
			input: ''
		}
	}

	handleSubmit = (event) => {
		const new_todo = {
			name: this.state.input,
			rename_input: ''
		}
		event.preventDefault()
		this.setState({
			todos: [...this.state.todos, new_todo],
			input: ''
		})
	}

	handleChange = (event) => {
		this.setState({
			input: event.target.value
		})
	}

	renameInput_change = (event, item) => {
		const {todos} = this.state
		console.log(item)

		for(let i = 0; i < todos.length; i++){
			if(todos[i] === item){
				todos[i].rename_input = event.target.value
			}
		}

		this.setState({
			todos
		})

	}

	renameInput_submit = (event, item) => {
		event.preventDefault()

		//deconstruction es6 syntax 
		//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
		const {todos} = this.state

		for(let i = 0; i < todos.length; i++){
			if(todos[i] === item){
				todos[i].name = todos[i].rename_input
				todos[i].rename_input = ''
			}
		}

		//Essentially, this.setState accepts an object paramter that you usually create
		//ie: this.setState({ foo: 'bar' })

		//So what I'm doing here at a basic level is:
		// 1. Deconstruct todos from this.state
		// 2. Change values within my deconstructed todos object
		// 3. Pass my todo object into setState

		// NOTE: deconstruction creates an immutable copy of the object.

		this.setState({todos})
	}


	render() {
		console.log(this.state)

		const todo_map = this.state.todos.map((item, index) => {
			
			//I'm passing functions as a prop!
			//You're not able to change state of any parent component.
			//You can travel DOWN the waterfall, but not UP the waterfall
			
			//However, I'm passing references to this component's that
			//are within the state's scope.

			return(
				<TodoItem 
					key={index} 
					item={item}
					index={index}
					inputHandler = {this.renameInput_change} 
					inputSubmit = {this.renameInput_submit}
					/>
			)
		})

		return (
			<div className="container" >
				<form onSubmit={this.handleSubmit}>
					<div className="add-group" >
						<label htmlFor="title">Enter a new to-do item: </label>
						<input onChange={this.handleChange} value={this.state.input} id="title" type="text"/>
					</div>
					
					<button className="submit-button">Create new to-do item!</button>
				</form>

				<div className="list-container" >
					<h3>My to-do list:</h3>
					{todo_map}
				</div>
			</div>
		);
	}
}

export default App;
