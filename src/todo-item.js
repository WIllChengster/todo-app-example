import React from 'react';

export default (props) => {
    console.log(props)
    return(
        <div className="todo-item" >
            <p> <span>{props.index}:</span> {props.item.name}</p>
            <div>
                <label htmlFor={`rename${props.index}`}>Rename: </label>
                <form onSubmit={(event) => props.inputSubmit(event, props.item)} >
                    <input onChange={ (event) => props.inputHandler(event, props.item) } value={props.item.rename_input} id={`rename${props.index}`} type="text"/>
                    <button>Confirm Rename</button>
                </form>

            </div>

        </div>
    )
}