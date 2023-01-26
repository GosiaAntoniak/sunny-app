import React from 'react';

const Form = props => {
    return (
        <form onSubmit={props.submit}>
            <input
                type="text"
                value={props.value}
                onChange={props.change}
                placeholder="Enter city"
            />
            <button>Search for city</button>
        </form>
    )
}

export default Form;
